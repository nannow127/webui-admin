import Vue from 'vue'

export default {
  clearAccount (state) {
    state.account = {}
  },
  addAccount (state, payload) {
    Vue.set(state, 'account', payload)
  }
}
