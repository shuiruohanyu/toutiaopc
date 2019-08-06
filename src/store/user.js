const state = {
  userInfo: {}
}
const mutations = {
  // 更新用户信息
  updateUserInfo (state, userInfo) {
    state.userInfo = { ...userInfo }
  }
}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
