import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
moment.locale("zh-cn");

import contentList from './modules/contentList'
import detail from './modules/detail'
import * as types from './mutation-types'
import { getTabName } from '../constants/config';


Vue.use(Vuex)

const utils = {
    getTransformedResponse(data) {
        return data.map(item => {
            item.create_at = moment(item.create_at).format("YYYY-MM-DD HH:mm");
            item.last_reply_at = moment(item.last_reply_at).fromNow();
            item.tagName = item.top?'置顶':getTabName(item.tab);
            return item;
        })
    }
};


const state = {
    tab: 'all',
    show: '',
    allPosts: []
}

const mutations = {
    [types.CHANGE_TAB](state,tab){
        state.tab = tab;
        state.allPosts = [];
    },
    [types.FETCH_SUCCESS](state,{data}){
        const appendedList = data.map(item=>{
            item.create_at = moment(item.create_at).format("YYYY-MM-DD HH:mm");
            item.last_reply_at = moment(item.last_reply_at).fromNow();
            item.tagName = item.top?'置顶':getTabName(item.tab);
            return item;
        });
        state.allPosts = [...state.allPosts,...appendedList]
    }
}
const getters = {
    // tab: state => state.tab,
    tabName: state => getTabName(state.tab),
    postList: state => state.allPosts.slice(0,state.contentList.count)
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