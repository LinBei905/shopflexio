/* eslint-disable no-console */
export function validateEmail(rule, value, callback) {
  const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,4})+$/.test(value)
  if (!valid) {
    callback(new Error('Please enter a valid email address.') )
  }
  else {
    callback()
  }
}

export function validatePhone(rule, value, callback) {
  const valid = /[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value) || !value.length
  if (!valid) {
    callback(new Error('Please enter a valid phone number.') )
  }
  else {
    callback()
  }
}