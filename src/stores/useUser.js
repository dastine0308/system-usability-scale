import { defineStore } from "pinia"

const LOGIN_STATE = 'login_state'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginState: sessionStorage.getItem(LOGIN_STATE) ? JSON.parse(sessionStorage.getItem(LOGIN_STATE)) : {} 
  }),
  getters: {
    getLoginState: state => state.loginState
  },
  actions: {
    clearLoginState() {
      this.$state.loginState = null
      sessionStorage.setItem(LOGIN_STATE, null)
    },
    updateLoginState(payload) {
      this.$state.loginState = payload
      sessionStorage.setItem(LOGIN_STATE, JSON.stringify(payload))
    }
  }
})