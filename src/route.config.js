import Vue from 'vue';
import VueRouter from 'vue-router';

/* eslint-disable no-new */
Vue.use(VueRouter);


require.config({
    paths: {
        'Home': './pages/home.vue',
        'About': './pages/about.vue',
        'Setting': './pages/setting.vue',
        'Message': './pages/messages.vue',
        'TopicDetail': './pages/topicDetail'
    }
});

const Home = resolve => require(['./pages/home.vue'],resolve);
// const Message = resolve => require(['Message'],resolve);
const Message = resolve => require(['./pages/messages.vue'],resolve);
const About = resolve => require(['./pages/about.vue'],resolve);
const Login = resolve => require(['./pages/login.vue'],resolve);
const Setting = resolve => require(['./pages/setting.vue'],resolve);

const TopicDetail = resolve => require(['./pages/topicDetail'], resolve)

// const TopicDetail = require('./pages/topicDetail');

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
    {
        path: "/login",
        component: Login
    },
    {
        path: "/topic/:id",
        name: "topic",
        component: TopicDetail
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
});

export default router;