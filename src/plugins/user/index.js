import pinia from '@/stores/pinia'
import { useAuthStore } from '@/stores/useUser'

const userStore = useAuthStore(pinia)

export class UserService {
  get loginState() {
    return userStore.getLoginState
  }

  signIn(userInfo) {
    const loginState = {
      isAdmin: userInfo?.isAdmin,
      projectCode: userInfo?.projectCode
    }
    userStore.updateLoginState(loginState)
  }

  signOut() {
    userStore.clearLoginState()
  }

  install(app) {
    const $appGlobal = app.config.globalProperties
    $appGlobal.$user = this
  }
}

export default new UserService()