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
