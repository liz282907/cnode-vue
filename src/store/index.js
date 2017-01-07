import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
moment.locale("zh-cn");

import contentList from './modules/contentList'
import detail from './modules/detail'
import reply from './modules/reply'
import * as types from './mutation-types'
import { getTabName } from '../constants/config';


import api from '../constants/api'
const {getTopicDetail} = api


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
    allPosts: [],
    user:{}
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
    },
    [types.FETCH_DETAIL_SUCCESS](state,{data}){
        // debugger
        console.log("data in parent ");
        data.create_at = moment(data.create_at).fromNow()
        data.last_reply_at = moment(data.last_reply_at).fromNow()
        data.replies = data.replies.map(item=>{
            return Object.assign(item, {
                create_at: moment(item.create_at).fromNow()
            })
        })
        let curIndex = -1;
        const prev = state.allPosts.find((post,index)=> {
            if(post.id ===state.detail.id) {
                curIndex = index;
                return true;
            }
            return false
        });
        const updatedObj = Object.assign({},prev,data);
        state.allPosts.splice(curIndex,1,updatedObj);
    },
    [types.UPDATE_USER](state,user){
        state.user = user;
    },
    [types.FREEZE_LOGINMODAL](state){
        state.detail.showModal = false;
    },
    [types.UPVOTE_COMMENT](state,payload){
        const post = state.allPosts.find(post => post.id === state.detail.id);
        const reply = post.replies.find(reply=>reply.id===payload.id);
        if(payload.action==='up') reply.ups.push(state.user.id);
        else {
            const index = reply.ups.findIndex(id=> id===payload.id);
            reply.ups.splice(index,1);
        }
    }
}
const getters = {
    // tab: state => state.tab,
    tabName: state => getTabName(state.tab),
    postList: state => state.allPosts.slice(0,state.contentList.count),
    urls: state => {
        return {
            topicDetail: getTopicDetail.url + state.detail.id
        }
    },
    detail: state => state.allPosts.find(post=>post.id===state.detail.id),
    validLogin: state => Object.keys(state.user).length,
    accesstoken: state => state.user.accesstoken,
    user: state => state.user
}

const actions = {
    changeTab({commit},tab){
        return new Promise((resolve,reject)=>{
            commit(types.CHANGE_TAB,tab);
            resolve();
        })
    },
    /**
     * [登录后更新store中的user信息，并由于replace route后会回到有弹窗的部分，需要禁用掉modal的显示]
     * @param  {[type]} options.commit [description]
     * @param  {[type]} user           [description]
     */
    updateUser({commit},user){
        commit(types.UPDATE_USER,user);
        commit(types.FREEZE_LOGINMODAL);
    },

}

export default new Vuex.Store({
    modules:{
        contentList,
        detail,
        reply
    },
    state,
    getters,
    mutations,
    actions
})