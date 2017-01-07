1. 登录：
- 更新当前用户信息，存储accessToken(全局store内部)   
- replaceState，把当前login的路由用fromRoute替换掉，但是会遇到提示要登录的modal

![](http://p1.bqimg.com/567571/360881e33b5d0aa1.png)。
解决：freeze掉modal。
- 之前的行为，点赞或者评论 
点赞后高亮，本来考虑每个reply item里面加一个属性，表示当前用户是否已点赞，然后作为icon的class属性去变动，但实际上没有必要，这是一个计算属性，而且逻辑不对，不能点击完再高亮，而是应该一登录完，就对所以已点赞的进行高亮显示。这边的处理逻辑是
```
<span class="upvote" @click="upvote(item)"><i :class="['iconfont','icon-upvote',{'highlight':item.ups.includes(user.id)}]"></i>{{item.ups.length}}</span>
```
item为每一个reply，ups是点赞该reply的所有用户id,因此只要include判断就好。
需要注意的是，vue template无法访问全局getter,需要mapGetters到.vue里面才行。
还存在的问题

2. replybox里的状态区分
reply放入store里面，因为这样的话可以不用点击评论后重新输入
show 放入data, 监听父传下来的props,自身维护data

---
### 小需求
| 序号| 需求说明 | 状态 | 备注 |
| :---|:---------|:-----|:------| 
|  1  |登录后replace路由，更新用户信息,freeze modal| done | |
|  2  |登录后提示|  | |
|  3  |点赞后高亮(一登录后对本用户点赞的评论都高亮)|  done | |
|  4  |createTime相关的用filter处理|   | |


---
### 大需求
1. 二维码扫描登录
2. websocket推送当前回复
3. loginmodal 单例模式、点击再创建， 设计模式中提到的
4. 用户画像，点赞图