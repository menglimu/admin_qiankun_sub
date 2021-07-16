const fs = require('fs');
const path = require('path');
const http = require('http');

// import fs from 'fs';
// import path from 'path';
// import http from 'http';

// TODO: 多个group 文件夹
// TODO: 多层嵌套fef处理



let API_PATH = './modules';
let url = 'http://47.92.175.76:8101/offline';

// 接口
type Interface  = Method & {
  method: string;
  url: string; 
}
// swagger返回的paths内的get等后的内容
interface Method{
  
  tags: string[];
  summary: string;
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: any[];
  responses: any
  deprecated: boolean;
  "x-order": string;

}


// swagger的模块
interface Group {
  
    swagger: string;
    info: {
        version: string;
        title: string;
        termsOfService: string;
        contact: {
            name: string;
            url: string;
        };
    };
    host: string;
    basePath: string;
    tags: {
        name: string;
        description: string;
    }[];
    consumes: string[];
    produces: string[];
    paths: Record<string,Record<string,Method>>;
    definitions: any;

}
// 一个文件模块
interface Module {
  name: string;
  description: string;
  interfaces: Interface[];
  lastUrl?: string
}

// 判断目录是否存在
const isExist = (lastPath = '') => {
  const privatePath = `${lastPath ? lastPath : API_PATH}`;
  const stat = fs.existsSync(privatePath);
  if (!stat) {
    fs.mkdirSync(privatePath);
  }
};
// 首字母大写
function firstUp(str:string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
// 模块文件名
function moduleName (url:string) {
  // "/api/cmsArticle/v1/list"
  return url.split('/')[2]
};

// 数据类型
function dataType(key)  {
  const type = {
    string: 'string',
    integer: 'number',
    int: 'number',
    long: 'string',
    Array: 'array',
    file: 'Blob',
    boolean: 'boolean'
  };
  return type[key] ? type[key] : 'any';
};



class GenerateApis {
   group:Group // 当前处理的group
   
  getDefinitionsInterface(ref:string,interfaceName: string) {
    console.log(ref,2);
    let schema = this.group.definitions[ref.split('/').pop()]
    if (schema.type === 'object' && schema.properties) {
      let keys = Object.keys(schema.properties)
      let params_ = keys.map(key=>{
        schema.properties[key]['key'] = key;
        return schema.properties[key] 
      })
      if (params_) {
        return `interface ${interfaceName} {
${params_.map(item => 
`  /** ${item.description || ''} */
  ${item.key}${schema.required&&schema.required.includes(item.key) ? '' : '?'}: ${dataType(item.type)};
`
        ).join('\n')}
}`;
      }
    }
    return  ''
  }
  
  // 参数模板
  interfaceParamsTpl (api: Interface, interfaceName: string)  {
    let params_ = []
    if (api.method === 'get'||api.method==='delete') {
      params_ = api.parameters.filter(item => item.in === 'query')
      if (params_.length === 0) {
        return '';
      } else {
        return `interface ${interfaceName} {
${params_.map(item => 
`  /** ${item.description || ''} */
  ${item.name}${item.required ? '' : '?'}: ${dataType(item.type)};
`).join('\n')}
}`;
      }
    }else{
      let bodys = api.parameters.filter(item => item.in === 'body')
      return bodys.map(item => this.getDefinitionsInterface(item.schema.$ref,interfaceName))[0] || ''
    }
  };
  
  // 写入模板
  tplInsertApi(api:Interface) {
    let url = api.url
    let params:string[] = []
    // 有{id}这样的接口查询的时候
    let reg = /{(.*?)}/g
    if (reg.test(url)) {
      url = url.replace(reg,(id)=>`$${id}`)
      // 讲参数拼接进入接口参数
      params = url.match(reg).map(str => str.replace(/[{}]/g,'')+': string | number')
    }
    let fnName = api.operationId
    // post 里面有query时的处理
    if (api.method === 'post' || api.method === 'put') {
      params.concat(...api.parameters.filter(item => item.in === 'query').map(item => item.name +': string | number')) 
    }
  
    let interfaceParams = this.interfaceParamsTpl(api, 'I'+fnName)
    if (interfaceParams) {
      params.push(`params: ${'I'+fnName}`)
    }
    let resInterface = ''
    
    let resName = 'Res'+fnName
    if (api.responses['200'].schema && api.responses['200'].schema.originalRef ) {
      console.log(api.responses['200'].schema.originalRef,1);
      let data = this.group.definitions[api.responses['200'].schema.originalRef].properties.data
      if (data) {
        if (data.type === 'array') {
          resInterface = this.getDefinitionsInterface(data.items.$ref,resName)
          resName += []
        }else if(!data.type){
          resInterface = this.getDefinitionsInterface(data.$ref,resName)
          
        }else{
          resName = dataType(data.type)
        }
      }
    }
    
    return `
${interfaceParams}
${resInterface}
/**
 * @description ${api.summary}
 */
export function ${fnName}(${params.join(', ')}) {
  return request.${api.method}${resInterface?`<${resName}>`:''}(\`${url}\`${interfaceParams?', params':''});
}
`;
  };
  // 写接口文件
  writeModules(modules:Module[]) {
    
    modules.forEach(module=> {
      if (module.interfaces.length === 0) {
        return
      }
      // 文件头部
      let text =
`/**
 * ${module.name}
 * @description 自动生成接口文件 ${module.description}
 */
import request from "@/api/request";
  
${module.interfaces.map(item => this.tplInsertApi(item)).join('\n')}
`
      isExist(API_PATH+'/'+this.group.info.title);
      fs.writeFileSync(API_PATH+'/'+this.group.info.title+'/'+module.name+'.ts',text)
    })
  }
  
   async getGroup(url) {
    isExist();
    try {
      // 解析url 获得
      this.group = await get(url);
      let { tags, paths } = this.group;
      // 一个module为一个文件
      let modules:Module[] = tags.map(tag => ({ ...tag, interfaces:[] }));
      // 找不到tag的接口放这里面
      modules.push({
        name: 'other',
        description: '找不到的模块的接口',
        interfaces: []
      })
      
      const urls = Object.keys(paths); // 获取url路径
  
      urls.forEach(url => {
        // get post等
        let methods = Object.keys(paths[url])
        let interfaces:Interface[] = methods.map(method=>({...paths[url][method],method:method.toLocaleLowerCase(),url})) 
        interfaces.forEach(item => {
          let module = modules.find(module=> item.tags.includes(module.name)) || modules.find(module=> module.name === 'other')
          module.interfaces.push(item)
          module.lastUrl = url
        })
      });
  
      this.writeModules(modules)
    } catch (e) {
      console.log(e);
    }
  }
  async getAll() {
    // 获取文档模块列表
    let data = await get(`${url}/swagger-resources`);
    isExist();
    data.forEach(group => {
      this.getGroup(`${url}${group.url}`)
    });
    // fs.mkdirSync('./modules');
  }
}


 
function get(url: string, options?) {
  return new Promise<any>((resolve, reject) => {
    http
      .get(url, options, res => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
        if (statusCode !== 200) {
          error = new Error(`Request Failed.\n'  Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(`Invalid content-type.\n' Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error.message);
          // 消费响应数据以释放内存
          res.resume();
          return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
            reject(e);
          }
        });
      })
      .on('error', e => {
        reject(e);
        console.error(`Got error: ${e.message}`);
      });
  });
}


// getDirs();
// return;
// // const SwaggerParser = require('swagger-parser');
// // const beautify = require('js-beautify').js_beautify;
// const swaggerUrl = 'http://10.10.77.129:8080/v2/api-docs?group=oa%E7%AE%A1%E7%90%86';

// // api接口方法存放目录
// const API_PATH = path.resolve(__dirname, './modules');


let generateApis = new GenerateApis()
generateApis.getAll()

// gen('http://10.10.77.129:8080/v2/api-docs?group=%E4%BA%8B%E4%BB%B6%E7%AE%A1%E7%90%86');
// gen('http://47.92.175.76:8101/offline/v2/api-docs');
module.exports  = {}