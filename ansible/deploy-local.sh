#!/bin/bash


# ssh -i ./ansible/liudk.private -p50788 root@10.10.77.93  > /dev/null 2>&1 << remotessh

# 服务器地址
ip=10.10.77.93
# 服务器ssh端口
port=50788
# 私钥存放位置
keyPath="./ansible/liudk.private"

# 部署的路径。最后一层项目名文件夹或dist文件夹不在其中
filePath="/data/wwwroot/evaluation_fore"
# 部署的文件夹名
name="dist"

if [ $1 == "test" ]; then
  # 服务器地址
  ip=10.10.77.92
  # 部署的路径。最后一层项目名文件夹或dist文件夹不在其中
  filePath="/data/test/wwwroot/evaluation"
fi

echo "代码合并"
git checkout develop
git pull origin develop
git pull base develop
# git pull github 0107:develop

echo "打包"
npm run release

echo "上传"
# 压缩代码，上传，删除压缩包
tar -czf $name.tar.gz ./dist
scp -P $port -i $keyPath -r $name.tar.gz root@$ip:$filePath
rm -f $name.tar.gz

echo "部署"
# 服务器上执行相关的解压备份命令
ssh -i $keyPath -p$port root@$ip "
cd $filePath
mkdir -p $name
tar -cf dist_`date "+%Y-%m-%d_%H_%M_%S"`.tar $name
rm -rf $name
tar -xzf $name.tar.gz
"
