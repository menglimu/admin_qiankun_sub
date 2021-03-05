const jsonCodeConfig = window._jsonCodeConfig || {}

export default function get(key) {
  if (Object.prototype.hasOwnProperty.call(jsonCodeConfig, key)) {
    return jsonCodeConfig[key]
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
