import Vue from 'vue'
import Vuex from 'vuex'

import contentList from './modules/contentList'
import detail from './modules/detail'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
    tab: 'all',
    show: '',
}

const mutations = {
    [types.CHANGE_TAB](state,tab){
        state.tab = tab;
    }
}
const getters = {
    tab: state => state.tab
}

const actions = {
    changeTab({commit},tab){
        return new Promise((resolve,reject)=>{
            commit(types.CHANGE_TAB,tab);
            resolve();
        })
    }
}

export default new Vuex.Store({
    modules:{
        contentList,
        detail
    },
    state,
    getters,
    mutations,
    actions
})