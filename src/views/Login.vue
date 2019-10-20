<template>
  <div id="login-container" class="p-grid p-align-center p-justify-center">
    <svg version="1.1"
      viewBox="0 0 261.76 226.69"
      xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
        <g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883"/></g>
        <g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"/></g>
        </g>
    </svg>

    <div id="login" class="text-center">
      <div class="p-grid">
        <div id="panel-color" class="p-md-6"></div>
        <div id="panel-form" class="p-sm-12 p-md-6 p-grid p-dir-col p-justify-center">
          <h1 class="text-center">Bienvenido</h1>

          <Message v-for="msg of messages" :key="msg.text" :severity="msg.type" :closable="msg.closeable">
            {{ msg.text }}
          </Message>

          <form @submit.prevent="login()">
            <div class="p-grid p-justify-center">
              <div class="p-col-10 p-col-md-8">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon"><i class="pi pi-user" /></span>
                  <InputText v-model="user.email" :placeholder="'routes.login.email' | translate" required="true" type="email" />
                </div>
              </div>
              <div class="p-col-10 p-col-md-8">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon"><i class="pi pi-lock" /></span>
                  <InputText v-model="user.password" :placeholder="'routes.login.password' | translate" required="true" type="password" />
                </div>
              </div>
              <div class="p-col-10 p-col-md-8 text-right">
                <Button
                  type="submit"
                  :label="'routes.login.login' | translate" class="p-button-info"
                  :disabled="waiting || $v.user.email.$invalid || $v.user.password.$invalid" />
              </div>
            </div>
          </form>
          <hr>
          <div class="p-grid full-width">
            <div class="p-col-6">
              <Button :label="'routes.login.register' | translate" class="p-button-success" />
            </div>
            <div class="p-col-6">
              <Button :label="'routes.login.login-google' | translate" class="p-button p-button-google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { HOME_ROUTE } from '@/router/constants'
import MixinsMessage from '@/mixins/message'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: null,
        password: null
      },
      initialBg: null,
      waiting: false
    }
  },
  methods: {
    async login () {
      const vm = this
      vm.$set(vm, 'waiting', true)
      vm.showInfo(vm.$t('routes.login.waiting'))
      try {
        const response = await vm.$auth.login(vm.user.email, vm.user.password)

        console.log(response)
        if (response) {
          vm.showInfo(vm.$t('routes.login.welcome') + ' ' + response.name)
          vm.$router.replace(HOME_ROUTE)
        } else {
          vm.showError(vm.$t('routes.login.invalid'))
        }
        vm.$set(vm, 'waiting', false)
      } catch (error) {
        console.log(error)
        vm.showError(vm.$t('routes.login.failed'))
        vm.$set(vm, 'waiting', false)
      }
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(24)
      }
    }
  },
  mounted () {
    document.getElementById('app').classList.add('login-background')
  },
  beforeDestroy () {
    document.getElementById('app').classList.remove('login-background')
  },
  components: {
    Message,
    InputText,
    Button
  },
  mixins: [
    MixinsMessage
  ]
}
</script>
<style lang="sass">
.login-background
  background-color: #333

#login-container
  height: 100vh
  width: 100vw
  margin: 0

  svg
    position: fixed
    max-height: 8rem
    top: 1rem
    opacity: .8

  hr
    width: 60%
    margin: 1.5rem 0

  #panel-form
    width: 100%
    align-items: center

  #login
    background-color: white

    h1
      padding-bottom: 1rem

  @media screen and (max-width: 767px)
    #login
      padding: 2rem 0
      width: 85%

    #panel-color
      display: none

  @media screen and (min-width: 768px)
    #panel-form
      width: 50%

    #login
      overflow: hidden

      #panel-color
        background-color: whitesmoke
        background: url('../assets/paisaje_pixabay_720.jpg')
        background-size: cover
        min-height: 25rem
        width: 50%

</style>
