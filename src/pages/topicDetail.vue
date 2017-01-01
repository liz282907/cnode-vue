<template>
    <div>
        <header-bar title="话题"></header-bar>
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
                                <span class="huifu" @click=replyComment(item)><i class="iconfont icon-huifu"></i></span>

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
import HeaderBar from '../components/header-bar'
import { mapActions,mapGetters} from 'vuex'

const {getTopicDetail} = api

moment.locale('zh_cn');
export default {
    components:{
        'header-bar': HeaderBar,
        'modal': Modal
    },
    name:'detail',
    computed: {
        ...mapGetters(['loading','showModal','validLogin']),
        ...mapGetters({
            'data': 'detail'
        })
    },
    // data() {
    //     return {
    //         loading: false,
    //         data: {
    //             author:{}
    //         },
    //         showModal:false
    //     }
    // },
    created () {
        console.log( 'topic detail created',this.$route.params.id)
        this.fetchDetail(this.$route.params.id)
    },
    watch:{
        '$route'(){
            console.log(this.$route.params.id)
            this.fetchDetail(this.$route.params.id);
        }
    },
    // beforeRouteEnter(to,from,next){
    //     //因为进这个导航hook的时候组件还没有创建，要等异步创建好后把prevRoute传过来
    //     next(vm=>{
    //         console.log(" in detail beforeRouteEnter ",to.params.id)
    //         vm.$store.dispatch('updateCurId',to.params);
    //     });
    // },

    methods: {

        ...mapActions(
            ['updateCurId','fetchDetail',
            'toggleModal','upvote',
            'replyComment']),
        closeModal(){
            this.toggleModal(false);
        },
    }
}

</script>
<style lang="scss">
    .page {
        padding: 10px;
        margin-top: 54px;
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
                            cursor: pointer;
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