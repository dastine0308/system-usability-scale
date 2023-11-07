import Api from '@/services/Api'

export default {
    save(credentials) {
        return Api().post('/save', credentials)
    }
}