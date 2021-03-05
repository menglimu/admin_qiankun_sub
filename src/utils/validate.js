/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证字符串是否是正整数*/
export function validateNumber(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}

/* 验证密码至少 8 位，需包含数字、英文字母、特殊符号（~!@#$%^&*）*/
export function validateStrongPassword(str) {
  const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/
  return reg.test(str)
}

/* 验证字符串是否是邮箱 */
export function validateEmail(str) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  return reg.test(str)
}

/* 验证字符串是否是Json对象 */
export function validateIsJson(str) {
  if (typeof str === 'string') {
    try {
      // str.replace(/\s*/g,"") 去除str中多余的空格（空白处）
      const obj = JSON.parse(str.replace(/\s*/g, ''))
      // eslint-disable-next-line
      if (typeof(obj) === "object" && Object.prototype.toString.call(obj) === "[object Object]") {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
