<template>
  <div class="blogs-page mt-4 px-4 lg:px-0">
    <article class="m-auto">
      <h1
        class="text-4xl flex items-center font-extrabold leading-tighter tracking-tighter mb-4"
        style="display: flex; justify-content: center">
        <span>Book a Demo</span>
      </h1>
      <div class="max-w-6xl m-auto">
        <p class="text-xl text-gray-600 mb-8 max-w-3xl m-auto">
          Ready to automate your store?
          Fill this form out to book a demo to learn how Shopflex can help
          automate your store so you can reclaim time and focus on growth.
        </p>
      </div>
    </article>
    <div class="m-auto max-w-xl">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto" label-position="top">
        <el-form-item label="Business email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Is there a particular use case you would like to discuss?" prop="question">
          <el-input v-model="form.question" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="What date and time suit you the best?" prop="dateTime">
          <el-date-picker v-model="form.dateTime" type="datetime" placeholder="Pick a date and a time"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Submit</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useAsync } from '@nuxtjs/composition-api'

import { sendBookRequest } from '~/api'

import { validateEmail, validatePhone } from '../shared/validateEmail'
export default defineComponent({
  name: 'Blogs',
  data() {
    return {
      form: {
        email: '',
        phone: '',
        question: '',
        dateTime: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter your business email.', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      this.form.question = 'Homepage, ' + this.form.question
      if (this.form.dateTime.length) {
        this.form.question = this.form.question + ` 
          This time suits me the best: 
        ` + this.form.dateTime
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          const res = await sendBookRequest(this.form)
          // if (!res) {

          // }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
