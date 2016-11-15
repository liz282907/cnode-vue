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
                    <li>
                        <i class="iconfont icon-login"></i>
                        <span>全部</span>
                    </li>
                    <li>
                        <i class="iconfont icon-login"></i>
                        <span>精华</span>
                    </li>
                    <li>
                        <i class="iconfont icon-login"></i>
                        <span>分享</span>
                    </li>
                    <li class="border-bottom">
                        <i class="iconfont icon-login"></i>
                        <span>招聘</span>
                    </li>
                    <li>
                        <i class="iconfont icon-login"></i>
                        <span>消息</span>
                    </li>
                    <li>
                        <i class="iconfont icon-login"></i>
                        <span>关于</span>
                    </li>
                </ul>
            </section>
        </div>>
    </transition>
</template>
<script>
export default {
    name: 'slideCard',
    data () {
        return {
            // modalShow: this.show
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
    .link-list {
        li {
            line-height: 40px;
        }
        .border-bottom {
            border-bottom: 1px solid #d4d4d4;
        }
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
    
</style>