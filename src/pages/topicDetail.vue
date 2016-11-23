<template>
    <div>
        <div class="page">
            <h2 class="page-header">{{data.title}}</h2>
            <div class="page-author">
                <img :src="data.author.avatar_url" />
                <span>{{data.author.loginname}}</span>
                <span>{{data.create_at}}</span>
                <span>{{data.reply_count}}<span>
            </div>
            <div class="page-content" v-html="data.content">
            </div>
            <div class="page-reply">
                <ul>
                    <li v-for="item in data.replies">
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
import api from '../constants/api'
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
            const self = this;
            axios.get(getTopicDetail.url).then((response) => {
                self.data = response.data.data;
                console.log(response.data)
            })
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
    }

</style>