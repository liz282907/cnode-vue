<template>
    <div class="login">
        <header-bar title="登录"></header-bar>
        <div class="login-box">
            <transition name='label-show'>
                <label v-show.lazy="inEdit" >Access Token</label>
            </transition>
            <input type="text" :class="['input',{'input-err': !validInput}]" v-model="accessToken" placeholder="Access Token:" />
            <transition name='errtip'>
                <span class="error-tip-span" v-show="!validInput">
                {{server.errTip}}
                </span>
            </transition>

            <div class="button-group">
                <button class="QR-Code-btn">扫描二维码</button>
                <button class="login-btn" @click="login">登录</button>
            </div>
            <p><a class="tooltip" href="">如何获取Access Token?</a></p>
        </div>

    </div>

</template>
<script>

import HeaderBar from '../components/header-bar';

import URLS from '../constants/api'
import router from '../route.config'

export default {
    components:{
        'header-bar': HeaderBar
    },
    data() {
        return {
            accessToken: null,
            validInput:true,
            server:{
                errTip:''
            },
            fromRoute:''
        }
    },
    computed:{
        inEdit(){
            return this.accessToken
        }
    },
    watch:{
        accessToken:function(newInput){
            this.validInput = true;
        }
    },
    beforeRouteEnter(to,from,next){
        //因为进这个导航hook的时候组件还没有创建，要等异步创建好后把prevRoute传过来
        next(vm=>{
            vm.fromRoute = from.fullPath;
        });
    },
    methods: {
        backToPrev(){
            router.go(-1);
        },
        login(){
            //show loading
            const that = this;
            const prevToken = this.accessToken;
            axios.post(URLS.postLoginToken.url,{
                accesstoken: this.accessToken
            })
            .then(res=>{
                //hide loading
                //
                if(res.data.success){
                    // localStorage.setItem('user',JSON.stringify(res.data));

                    // const prevRouter = this.$router.
                    router.replace(that.fromRoute);
                }
                else{
                    that.errTip = res.error_msg;
                }

            })
            .catch(err=>{
                const response = err.response.data;
                if(!response.success){
                    that.validInput = !that.accessToken===prevToken;
                    that.server.errTip = response.error_msg;
                }
            })
        }
    }
}

</script>
<style lang="scss">

$base-green: #65C727;
input{
    outline: none;
    border: none;
    background: none;
}


.login{
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    // padding: 5%;
    // border: 1px solid red;
    &-box{
        width: 80%;
        padding: 8%;
        top: 40%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        label{
            position: absolute;
            color: $base-green;
            top: -4px;
            font-size: 12px;
            font-family: Roboto, sans-serif;
        }
        // .label-show-enter,.label-show-leave-active{

        // }
        .label-show-enter-active,.label-show-leave-active{
            transition: all .3s ease;
        }
        .label-show-enter,.label-show-leave-active{
            top: -2px;
            opacity:0;
        }
        .input{
            width: 100%;
            padding: 5px;
            font-family: Roboto, sans-serif;
            border-bottom: 1px solid $base-green;
            &-err{
                border-bottom: 2px solid red;
            }
        }
        .button-group{
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            button{
                padding: 6px;
                width: 46%;
                border: 1px solid $base-green;
                box-shadow: 0 2px 4px #666;
            }
            .login-btn{
                background: $base-green;
                color: #fff;
            }
        }
        p{
            text-align: center;

            .tooltip{
                font-size: 12px;
                text-decoration: underline;
                color: $base-green;

            }
        }
        // .errtip{
        //     // margin-bottom: 20px;
        //     &-enter-active,&-leave-active{
        //         // transition: margin-bottom .3s ease;
        //         transition: all .3s ease;
        //     };
        //     &-enter,&-leave-active{
        //         // margin-bottom: 0;
        //         display: none;
        //     }

        // }
        .error-tip-span{
            font-size: 12px;
            color: red;
            opacity: 1;
        }
        .errtip-enter-active,.errtip-leave-active{
                transition: opacity .3s ease;
            };
        .errtip-enter,.errtip-leave-active{
            opacity: 0;
        }







    }
}
</style>