import { isEmail } from './core'

const emailValidator = (rule, value, callback) => {
  if (isEmail(value)) {
    return callback()
  }
  callback(new Error('Please enter the correct email format.'))
}
export const vEmail = [
  // { required: true, trigger: 'blur' },
  {
    validator: emailValidator,
    trigger: 'blur',
  },
]

export const vRequired = [{ required: true, trigger: 'blur' }]
export const vRequiredChange = [{ required: true, trigger: 'change' }]
