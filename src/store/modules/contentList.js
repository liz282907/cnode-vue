import * as types from '../mutation-types'
import moment from 'moment'
import { getTabName } from '../../constants/config';
moment.locale("zh-cn");


const limit = 10;
let responseDict = {};
const utils = {
    getTransformedResponse(data) {
        return data.map(item => {
            item.create_at = moment(item.create_at).format("YYYY-MM-DD HH:mm");
            item.last_reply_at = moment(item.last_reply_at).fromNow();
            item.tagName = item.top?'置顶':getTabName(item.tab);
            return item;
        })
    },

}


const state = {
    postPage:1,
    count: 0,
    scrollTop: 0,
    // pageList: [],
    // postList: [],
    showSlide: false,
    responseDict: {}
}

const getters = {
    // postList: state => state.postList,
    postPage: state => state.postPage,
    showSlide: state => state.showSlide

}

const mutations = {
    [types.FETCH_POSTLIST](state,page){
        // state.pageList.push(page);
        state.postPage = page;
    },
    [types.FETCH_SUCCESS](state,{data}){
        if (data.length) {
            responseDict[state.postPage] = true;
            state.count += data.length;
            // state.postList = [...state.postList, ...data];
        }
    },
    [types.FETCH_ERROR](state,err){
        responseDict[state.postPage] = false;
        console.log(`获取第${state.postPage}页列表数据失败`,err);
    },
    [types.RESET_PAGE](state){
        state.postPage = 1;
        state.postList = [];
        state.showSlide = false;
        responseDict = {};

        // localStorage.removeItem('postList');
        // localStorage.removeItem('scrollTop');
    },
    [types.SET_STORAGE](state,{scrollTop}){
        localStorage.setItem('scrollToPage',JSON.stringify(scrollTop));
        localStorage.setItem('postList',JSON.stringify(state.postList));
    },
    [types.RECOVER](state){
        // state.postList = JSON.parse(localStorage.getItem('postList'));
        // window.scroll(0,JSON.parse(localStorage.getItem('scrollTop')));
    },
    [types.INCRE_POSTPAGE](state){
        state.postPage++;
    },
    [types.TOGGLE_SLIDE](state){
        if(arguments[1]!==undefined){
            const newState = arguments[1];
            state.showSlide = newState;
        }
        else
            state.showSlide = !state.showSlide;
    }

}


const actions = {
    scrollToPage({commit,state,rootState},page=1){
        if(responseDict[page]) return;
        commit(types.FETCH_POSTLIST,page);
        axios.get('https://cnodejs.org/api/v1/topics', {
                    params: {
                        page,
                        tab: rootState.tab,
                        limit
                    }
                })
                .then(response => {
                    console.log(response.data)
                    commit("FETCH_SUCCESS",response.data)
                })
                .catch(err => commit("FETCH_ERROR",err));
    },
    reset({commit,state,dispatch}){
        //分发给根组件，改变tab值
        commit(types.RESET_PAGE);
        // dispatch('scrollToPage');
    },
    setStorage({commit},payload){
        // commit(types.SET_STORAGE,payload);
    },
    recover({commit}){
        commit(types.RECOVER);
    },
}


export default{
    state,
    getters,
    actions,
    mutations
}
