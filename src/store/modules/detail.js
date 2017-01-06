import * as types from '../mutation-types'


import api from '../../constants/api'
const {getTopicDetail} = api

const state = {
    loading: false,
    id: -1,
    // data: {
    //     author:{}
    // },
    showModal:false
}

const getters = {

    showModal: (state) => state.showModal,
    topicDetailUrl: state => getTopicDetail.url + state.id
}

// const getters = {
//
// }

const mutations = {
    [types.FETCH_DETAIL](state,id){
        state.id = id;
        state.loading = true;
    },
    [types.FETCH_DETAIL_SUCCESS](state,{data}){
        state.loading = false;
        console.log("success in child ",data)
    },
    [types.FETCH_DETAIL_ERROR](state,err){
        state.loading = false;
        console.log(" fetch detail err ",err)
    },
    [types.UPDATE_DETAIL_ID](state,payload){
        state.id = payload.id;
    },
    [types.TOGGLE_MODAL](state,payload){
        if(payload) state.showModal = payload[0];
        else state.showModal = !state.showModal;
        // debugger
        // if(willShow) state.showModal = willShow;
        // else state.showModal = !state.showModal;
    },
    [types.UPVOTE_COMMENT](state,payload){

    }
}


const actions = {
    fetchDetail({commit,state,getters},id){
        commit(types.FETCH_DETAIL,id);
        const url = getTopicDetail.url + id;

        axios.get(getters.topicDetailUrl).then((response) => {
            commit(types.FETCH_DETAIL_SUCCESS,response.data);
            // self.getTransformedResponse(data)
            // self.data = data
        },(err)=> {
            commit(types.FETCH_DETAIL_ERROR,err);
        });
    },
    toggleModal({commit}){
        const payload = Array.prototype.slice.call(arguments,1);
        commit(types.TOGGLE_MODAL,payload);
    },
    upvote({commit,getters},{id}){
        if(!getters.validLogin){
            commit(types.TOGGLE_MODAL,false);
        }
        else{
            axios.post(`https://cnodejs.org/api/v1/reply/${id}/ups`,{
                accesstoken: getters.accesstoken
            }).then((response)=>{
                commit(types.UPVOTE_COMMENT,{id,...response.data});
            },err=>{
                console.log("upvote comment err",err);
            })

        }
    },
    replyComment({commit,getters},payload){
        if(!getters.validLogin){
            commit(types.TOGGLE_MODAL,false);
        }
        else{
            commit(types.REPLY_COMMENT,payload);
        }
    }

    // updateCurId({commit},payload){
    //     return new Promise((resolve,rej)=>{
    //         commit(types.UPDATE_DETAIL_ID,payload);
    //         resolve();
    //     })
    // }
}


export default{
    state,
    getters,
    actions,
    mutations
}
