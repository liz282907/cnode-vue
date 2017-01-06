const navData = [
    {
        tab:'all',
        name: '全部',
        icon: 'message'
    },
    {
        tab:'good',
        name: '精华',
        icon: 'upvote'
    },
    {
        tab:'share',
        name: '分享',
        icon: 'share'
    },
    {
        tab:'ask',
        name:'问答',
        icon: 'ask'
    },
    {
        tab:'job',
        name: '招聘',
        icon: 'gongwenbao'
    }

];

const columnList = [
    {
        path:'/message',
        name:'消息',
        icon: 'bell'
    },
    {
        path:'/setting',
        name: '设置',
        icon: 'icon02'
    },
    {
        tab:'/about',
        name: '关于',
        icon: 'about'
    }
];

function getTab(obj){
    return function(tab){
        return obj.reduce((prev,cur)=> {
            const key = cur.tab.match(/\/(\w+)/)[1];
            prev[tab] = cur.name;
            return prev;
        },{})[tab];
    }
}


function getTabName(tab){
    return navData.reduce((prev,cur)=> {
            prev[cur.tab] = cur.name;
            return prev;
        },{})[tab];
}

// b1fbf683-5857-4730-9a3b-4d62ddf761dd

export { navData ,columnList, getTabName}