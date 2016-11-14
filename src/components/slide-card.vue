<template>
    <transition name="slide-fade">
        <div v-if="show" class="left-slide-card">
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
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all 0.5s ease;
            width: 200;
        
    }
    .slide-fade-enter, .slide-fade-leave-active {
            width: 0;
    }
    .left-slide-card{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        padding-left: 30px;
   
        background: #fff; 
        border-right: 1px solid #b3b3b3;
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
    .left-nav-bar {
        z-index: 10000;
    }
</style>