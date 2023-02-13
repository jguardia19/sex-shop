import Vue from 'vue'
import Vuex from 'vuex'

//modules
import cart from './modules/cart'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        cart,
        login,
    },

    state: {

    },
    mutations: {



    },
    actions: {



    },
    getters: {

    }
})