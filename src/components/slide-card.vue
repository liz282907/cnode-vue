<template>
    <transition name="slide-fade">
        <div v-show="show" class="left-slide-card">
            <div class="layer-shade" @click="cancel"></div>
            <section class="left-nav-bar">
                <div class="user-login-wrapper">
                    <div v-if="isLogin">
                    </div>
                    <div v-else>
                        <i class="iconfont icon-login"></i>
                    </div>
                </div>
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
        console.log(this)
        // if(this.modalShow != this.show) {
        //     this.modalShow = this.show;
        // }
         
    },
    methods: {
    },
    watch: {
        // show(val) {
        //     console.log(val)
        //     this.modalShow = val;
        // }
    }

}

</script>
<style lang="scss">
    .slide-fade-enter-active.left-slide-card, .slide-fade-leave-active.left-slide-card {
        transition: all 0.5s ease;
        .left-nav-bar {
            transition: all 0.5s ease;
            width: 200px;
        }
        
    }
    .slide-fade-enter.left-slide-card, .slide-fade-leave-active.left-slide-card {
        .left-nav-bar {
            width: 0;
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
        background: #fff;
        z-index: 10000;
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