const JsonCode = window._jsonCode || {}

export default function get(key) {
  if (JsonCode.hasOwnProperty(key)) {
    return JsonCode[key]
  } else {
    return null
  }
}
export const V2N = function(key, value) {
  const d = get(key)
  const l = d && d.length
  for (let i = 0; i < l; i++) {
    if (d[i]['codeValue'] === value || d[i]['codeValue'] === `${value}`) {
      return d[i]['codeName']
    }
  }
  return null
}
const _funType = get('FUN_TYPE')
const _funTypeVN = Object.prototype.toString.call(_funType) === '[object Array]' && _funType.map(item => item.codeName)
export const funType = function(key) {
  return _funTypeVN ? _funTypeVN[parseInt(key)] : ''
}

export function getCodeName(val, dataType) {
  const codeData = get(dataType)
  const valType = typeof val
  if (codeData && codeData.length) {
    const filter = codeData.filter(item => {
      if (valType === 'number') {
        return parseInt(item.codeValue) === val
      } else if (valType === 'string') {
        return item.codeValue === val
      }
    })
    if (filter && filter.length) {
      return filter[0].codeName
    } else {
      return ''
    }
  }
}

export function getCodeValue(val, dataType) {
  const codeData = get(dataType)
  if (val && val.length) {
    if (codeData && codeData.length) {
      const filter = codeData.filter(item => {
        return item.codeName === val
      })
      if (filter && filter.length) {
        return filter[0].codeValue
      } else {
        return ''
      }
    }
  }
}
