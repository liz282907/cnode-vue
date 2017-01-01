import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
moment.locale("zh-cn");

import contentList from './modules/contentList'
import detail from './modules/detail'
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




        // state.allPosts.map(post=>{

        // })
        // debugger

        // const updatePost = state.allPosts.find( ({id})=> id===state.detail.id )[0];


    },
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
    detail: state => state.allPosts.find(post=>post.id===state.detail.id)
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