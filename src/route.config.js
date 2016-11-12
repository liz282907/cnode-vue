import Vue from 'vue';
import VueRouter from 'vue-router';

/* eslint-disable no-new */
Vue.use(VueRouter);


require.config({
    paths: {
        'Home': './pages/home.vue',
        'About': './pages/about.vue',
        'Setting': './pages/setting.vue',
        'Message': './pages/message.vue'
    }
});

const Home = resolve => require(['./pages/home.vue'],resolve);
const Message = resolve => require(['Message'],resolve);
const About = resolve => require(['About'],resolve);
const Setting = resolve => require(['Setting'],resolve);



let routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/messages",
        component: Message
    },
    {
        path: "/setting",
        component: Setting
    },
    {
        path: "/about",
        component: About
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes
});

export default router;