<template>
    <transition name="slide-fade">
        <div v-show="show" class="left-slide-card">
            <div class="layer-shade" @click="cancel"></div>
            <section class="left-nav-bar">
                <div class="user-login-wrapper">
                    <div v-if="isLogin">
                    </div>
                    <div v-else class="not-login">
                        <i class="iconfont icon-login"></i>
                        <span>登入</span>
                    </div>
                </div>
                <div class="split-line"></div>
                <ul class="link-list">
                    <li v-for="item in navData">
                        <router-link :to="{path:'/',query:{tab: item.tab}}">
                            <i :class="['iconfont','icon-'+item.icon]"></i>
                            <span class="tab">{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>
                <ul class="column-list">
                    <li v-for="item in columnList">
                        <router-link :to="{path: item.path}">
                            <i :class="['iconfont','icon-'+item.icon]"></i>
                            <span class="tab">{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>>
    </transition>
</template>
<script>
import { navData, columnList } from '../constants/config'

export default {
    name: 'slideCard',
    data () {
        return {
            // modalShow: this.show
            navData,
            columnList
        }
    },
    // created: function() {
    props: {
        show : {
            type: Boolean,
            default: false
        },
        isLogin: {
            type: Boolean,
            default: false
        },
        cancel: {
             type: Function,
             default: function() {

             }
        }
    },
    beforeUpdate() {
    },
    methods: {
    },
    watch: {

    }

}

</script>
<style lang="scss">
    .slide-fade-enter-active.left-slide-card, .slide-fade-leave-active.left-slide-card {
        transition: all 0.5s ease;
        .left-nav-bar {
            transition: all 0.5s ease;
            left: 0;
        }

    }
    .slide-fade-enter.left-slide-card, .slide-fade-leave-active.left-slide-card {
        .left-nav-bar {
            left: -200px;
            padding-left: 0;
            padding-right: 0;
        }
    }
    .left-slide-card{

    }
    .left-nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        bottom: 0;
        padding: 0 30px;
        background: #fff;
        overflow: hidden;
        z-index: 10000;

    }
    .user-login-wrapper {
        padding: 30px;
        padding-left: 0;
        line-height: 30px;
        border-bottom: 0.5px solid #d4d4d4;
        span {
            margin-left: 10px;
        }
        .icon-login {
            font-size: 30px;
            vertical-align: middle;
        }

    }
    .link-list,.column-list {
        border-bottom: 1px solid #d4d4d4;
        li {
            line-height: 45px;
        }
    }
    .iconfont{
        vertical-align: middle;
        font-size: 20px;
    }
    .layer-shade {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
    }
    .tab{
        margin-left: 2em;
    }
    a{
        width: 100%;
        vertical-align: middle;
        display: inline-block;
        color: rgba(0,0,0,0.54);
        font-size: 16px;
    }

</style>