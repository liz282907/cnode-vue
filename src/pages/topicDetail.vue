<template>
    <div>
        <div class="page">
            <h2 class="page-header">{{data.title}}</h2>
            <div class="page-author">
                <img :src="data.author.avatar_url" />
                <span class="margin-left">{{data.author.loginname}}</span>
                <span class="right margin-right">{{data.reply_count}}次浏览</span>
                <span class="right">{{data.create_at}}，</span>

            </div>
            <div class="page-content" v-html="data.content">
            </div>
            <div class="page-reply">
                <ul>
                    <li v-for="(item,index) in data.replies" class="page-reply-item">
                        <div class="page-reply-item-header clearfix">
                            <img :src="item.author.avatar_url" />
                            <div class="reply-detail">
                                <h3>{{item.author.loginname}}</h3>
                                <span class="highlight">{{index+1}}楼 .</span><span>{{item.create_at}}</span>
                            </div>
                            <div class="reply-action-group right">
                                <span class="upvote" @click="upvote(item)"><i class="iconfont icon-upvote"></i>{{item.ups.length}}</span>
                                <span class="huifu"><i class="iconfont icon-huifu"></i></span>

                            </div>
                        </div>
                        <div class="margin-top" v-html="item.content">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <modal :show='showModal' :cancel="closeModal"></modal>
    </div>

</template>
<script>
import api from '../constants/api'
import moment from 'moment'
import Modal from '../components/modal.vue'
const {getTopicDetail} = api

moment.locale('zh_cn');
export default {
    components:{
        'modal': Modal
    },
    data() {
        return {
            loading: false,
            data: null,
            showModal:false
        }
    },
    created () {
        this.fetchData()
    },
    watch:{
        '$route':'fetchData'
    },
    methods: {
        closeModal(){
            this.showModal = !this.showModal;
        },
        fetchData() {
            this.error = this.post = null
            this.loading = true
            getTopicDetail.id = this.$route.params.id;
            const self = this
            axios.get(getTopicDetail.url).then((response) => {
                let data = response.data.data

                self.getTransformedResponse(data)
                self.data = data
            })
        },
        getTransformedResponse (data) {
            data.create_at = moment(data.create_at).fromNow()
            data.last_reply_at = moment(data.last_reply_at).fromNow()
            data.replies = data.replies.map(item=>{
                return Object.assign(item, {
                    create_at: moment(item.create_at).fromNow()
                })
            })
            // debugger;
            return data;
        },
        validateLogin(){
            localStorage.removeItem('user');
            console.log(localStorage.getItem("user"));
            if(!localStorage.getItem("user")){
                this.showModal = true;
                return false;
            }
            return true;

        },
        upvote(item){
            if(!this.validateLogin())
            {

            }
        }
    }
}

</script>
<style lang="scss">
    .page {
        padding: 10px;
        &-header {
            padding: 10px;
            line-height: 25px;
            border: 0.5px solid #b6b8c6;
        }
        &-content {
            margin-top: 10px;
        }
        &-author {
            margin-top: 15px;
            line-height: 25px;
            img {
                width: 25px;
                vertical-align: middle;
            }
        }
        &-reply {
            &-item {
                margin-top: 25px;
                &-header {
                    vertical-align: middle;
                    display: inline-block;
                    width: 100%;
                    img {
                        width: 40px;
                        display: inline-block;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    .reply-detail,.reply-action-group{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .reply-detail{
                        margin-left: 4%;
                    }
                    .reply-action-group{
                        .huifu{

                            margin-top: 6px;
                        }
                        .iconfont{
                            font-size: 24px;
                            margin-right: 10px;
                        }
                        .icon-huifu{
                             font-size: 18px;
                        }
                    }
                }
            }
        }
    }

</style>