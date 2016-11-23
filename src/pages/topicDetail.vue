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
                    <li v-for="item in data.replies" class="page-reply-item">
                        <div class="page-reply-item-header">
                            <img :src="item.author.avatar_url" />
                            <span class="right">
                                {{item.author.loginname}}
                            </span>
                        </div>
                        <div class="margin-top" v-html="item.content">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
import api from '../constants/api'
import moment from 'moment'
const {getTopicDetail} = api
export default {
    data() {
        return {
            loading: false,
            data: null
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
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
            return data;
        },
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
                    img {
                        width: 25px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }

</style>