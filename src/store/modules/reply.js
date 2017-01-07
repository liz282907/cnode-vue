import marked from 'marked'

import * as types from '../mutation-types'


import api from '../../constants/api'

const {getTopicDetail} = api

const state = {
    reply: '',
}

const getters = {
    reply: state => state.reply,
    compiledReply: state=> marked(state.input,{sanitize:true})

}

// const getters = {
//
// }

const mutations = {
    [types.UPDATE_TEMPREPLY](state,{reply}){
        state.reply = reply;
    }
}


const actions = {
    updateTempReply({commit},payload){
        commit(types.UPDATE_TEMPREPLY,payload)
    },
    submitReply({commit}){

    }

}


export default{
    state,
    getters,
    actions,
    mutations
}
