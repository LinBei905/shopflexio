import { ref } from '@nuxtjs/composition-api'
import { Form } from 'element-ui'

/**
 * 由于 useForm 在 form 重新赋值存在问题，但需要兼容之前的代码，这里简单地 cv。
 * @returns
 */
export const useForm = <T>(
  // @ts-ignore
  initVal: T = {},
  _rules = {},
) => {
  const form = ref(initVal)
  const rules = ref(_rules)
  const formRef = ref<Form>()
  const validate = async () => {
    if (!formRef.value) return Promise.reject(new Error('Form Not Found'))
    return formRef.value.validate()
  }
  const getFormData = () => {
    return {
      // @ts-ignore
      ...form.value,
    } as T
  }
  const resetFields = () => {
    if (!formRef.value) return

    formRef.value.resetFields()
  }

  /**
   * @returns {Promise<{formData: any, form: any}>}
   */
  const prepare = async () => {
    try {
      const res = await validate()
      if (!res) return Promise.reject(new Error('Validate form data error'))
    } catch (err) {
      return Promise.reject(new Error('Validate form data error'))
    }
    return {
      // @ts-ignore
      formData: { ...form.value } as T,
      form: formRef.value,
    }
  }

  const clearValidate = (props?: string | string[]) => {
    if (!formRef.value) return
    return formRef.value.clearValidate(props)
  }

  return {
    form,
    rules,
    formRef,
    validate,
    getFormData,
    resetFields,
    prepare,
    clearValidate,
  }
}
