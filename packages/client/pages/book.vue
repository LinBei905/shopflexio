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
    <div class="m-auto max-w-xl text-left">
      <el-form class="book-form" ref="form" :model="form" :rules="rules" label-width="auto" label-position="top">
        <el-form-item label="Business email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-select v-model="form.country">
            <el-option
              v-for="item in countryCodesJson"
              :key="item.name"
              :value="item.dial_code"
              :label="item.name + ' ' + item.dial_code"></el-option>
          </el-select>
          <el-input v-model="form.phone" class="form-phone-number"></el-input>
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
    <el-dialog
      :title="bookSuccess ? 'Success' : 'Oops!'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span v-if="bookSuccess">Thanks for your booking. We will reach you as soon as possible.</span>
      <span v-if="!bookSuccess">:( Something happened. Please try again or contact us for your booking.</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose()">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useAsync } from '@nuxtjs/composition-api'
import _ from 'lodash'

import { sendBookRequest } from '~/api'

import countryCodes from '../assets/data/countryCodes'
import { validateEmail, validatePhone } from '../shared/validateEmail'
export default defineComponent({
  name: 'Book',
  data() {
    return {
      form: {
        email: '',
        country: '',
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
      },
      dialogVisible: false,
      bookSuccess: true,
      countryCodesJson: {}
    }
  },
  mounted() {
    this.countryCodesJson = countryCodes
  },
  methods: {
    async submitForm() {
      const paramForm = _.cloneDeep(this.form)
      paramForm.question = 'Homepage, ' + paramForm.question
      if (paramForm.dateTime.length) {
        paramForm.question = paramForm.question + ` 
          This time suits me the best: 
        ` + paramForm.dateTime
      }
      if (paramForm.phone.length) {
        paramForm.phone = paramForm.country + paramForm.phone
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(paramForm)
          // return
          const res = await sendBookRequest(paramForm)
          // const res = false
          if (!res) {
            this.bookSuccess = true
          }
          else {
            this.bookSuccess = false
          }
          this.bookSuccess = true
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    handleClose() {
      if (this.bookSuccess) {
        this.$router.push("/")
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.book-form {
  .el-select {
    .el-input {
      input {
        width: 104px;
      }
    }
  }
  .form-phone-number {
    width: calc(100% - 108px);
  }
}
</style>