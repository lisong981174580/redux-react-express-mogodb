

## react-redux  学习

### 一、Create-react-app 脚手架
> 生成框架
#### 安装
* npm install  -g create-react-app 首先装到全局
* create-react-app  imooc  创建一个项目名称为imooc的项目

### 二、安装第三方库  redux
> npm install  redux  —save（redux）
>
> npm install redux-react  --save (react和redux联系起来)
>
> import {createStore}  from 'redux'

### 三、自定义配置webpack
> npm run eject  是单向的不可逆的
* 多了 config 、 script 目录
* config  是webpack详细的配置
* script  是npm run 的实际执行命令
* 自定义配置在pack.json中配置

 ### 三、es6常用语法
 > es6是2015年6月发布,同时出现了babel转换器
 ### let 、const、模板字符串
 * let

 * const

 * ```
   `
   	hellow ${name}
   `
   ```
 ### 函数的扩展
```
const hellow=(name='123')=>{
   console.log(name)
}

```



### ...扩展运算符
* ...arr 展开数组、强转数组

  ```
  let arr=[1,2,3]
  console.log(...arr)
  //结果是 1，2，3

  ```

* 合并对象

```
 let obj1={name:'ls',arg:'23'}
 let obj2={type:'number'}
 console.log({...obj1,...obj2,data:'123'}
 //{name:'ls',arg:'23',type:'number',data:'123'}
```

### 对象的扩展
Object.keys、values、entries

```
 let obj={name:'imook',const:'123'}
 console.log(Object.keys(obj)
 //结果是  [name,const]
 
 console.log(Object.values(obj))
 //['imook','123'] 
  
 console.log(Object.entries(obj))
 //[name,const],['imook','123']]
```

```
//函数也可以这么写
let obj={
    name,
    [name]:'hellow',
    hellow:function(){
    },
    hellow(){
    }
}
```



### 解构赋值

```
 let arr=[1,2,3]
 let [a,b]=arr
```

##  四、express+mongodb

#### express
> 基于nodejs、快速、开放、极简的web开发框架
##### 安装
> npm install express --save 安装express
#### 安装mongodb  数据库
> 去官网安装 brew install mongodb  (官网上有）
> 首选要安装 brew  （官网上有）
###### 安装非关系型数据库 mongoose
> npm install mongoose --save  安装mongoose

#### 启动或关闭mogo

> brew services start mongodb 启动mongodb数据库

> brew services stop mongodb 停止mongodb数据库

####   查看mogo

> mongo 可以查看mongo信息(包括案例中的地址)

#### 写法案例

```
const express = require('express');
const mongoose = require('mongoose');

//连接mongo   并且使用imook集合
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
    console.log('mogo connect success ')
})

//类似于mysqu的表 mogo里面有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
}))
```

#### 增删改查

```

//新增数据
User.create({
    user:'imook',
    age:18
},function (err,doc) {
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})


//删除数据
User.remove({age:18},function (err,doc) {
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})


//更新数据
User.update({'_id': "5a38aad630669b2457f2e14f"},{'$set':{'user':'kejing'}},function (err,doc) {
      if(!err){
          console.log(doc)
      }else{

      }
    }
)

```

#### express 路由

```
//新建app
const app = express();
app.get('/', function(req, res) {
    res.send('<h1>hellow word</h1>')
})


app.get('/data', function(req, res) {
    User.find({}, function(err, doc) {
        res.json(doc)
    })
})

app.listen(9093, function() {
    console.log('node app start at port 9093')
})
```

## 五、使用插件

 > antd 是一款适用于web以及移动端的组件库
 > npm install antd-mobile --save
#### 1、引入方法

```
import {Button} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
//以上也可以在配置文件中配置
```

## 六、按需加载

> 需要安装   babel-plugin-import 支持
> npm install  babel-plugin-import --save
> 并且对package.json做如下配置



 ```
 "babel": {
     "presets": [
       "react-app"
     ],
     "plugins": [
       ["import", { "libraryName": "antd-mobile", "style": "css"}]
     ]
   },

 ```





## 七、redux

> https://www.jianshu.com/p/3334467e4b32

> 专注于状态管理，和react结合使用 

> 单一状态

> 核心概念：store、state、action、reducer

> npm install redux —save  

### 1、主要思想

> redux在我理解来看，他实际上是一个状态管理工具，运用reducer定义规则，利用createStore实例的对象使用这套规则，其中state为当前的状态，使用action去变更state,把所有的状态集中在一个或少量的js文件中统一处理，使得项目开发变得清晰

```

import { createStore } from 'redux';

//reducer
function counter(state = 0, action) {
    switch (action.type) {
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state - 1;
        default:
            return 10;
    }
}

//新建store
const store = createStore(counter);
const init = store.getState();
console.log(init)

//订阅事件
function listener() {
    const current = store.getState();
    console.log(`现在的机枪数${current}`)
}
store.subscribe(listener);
  
//2、派发事件，传递action
store.dispatch({ type: '加机关枪' })
store.dispatch({ type: '加机关枪' })
```



### 2、主要属性或方法

> Index.redux.js

```
//函数调用的类型全部用常量定义在一个js文件中，这样会使开发变得清晰
const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

//新建reducer 相当于定义了一个规则  
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}


//action creator (把所有的状态定义为函数的形式，因为后面会有简单的调用方法，使用dispatch)
export function addGUN() {
    return { type: ADD_GUN }
}

export function removeGUN() {
    return { type: REMOVE_GUN }
}


//也可以写异步函数
export function addGunAsync(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addGUN())
        },2000)
    }
}

```

> Index.js

```
//react核心库和dem库必须的
import React from 'react';
import ReactDOM from 'react-dom';

//引入redux里面的
 createStore(实力化redux)、
 applyMiddleware(开启redux中间件)、
 compose(把函数组合关联起来)
 
 import {createStore,applyMiddleware,compose} from 'redux';
 //使用异步中间件
 import thunk from 'redux-thunk';
 //将react和redux结合起来
 import  {Provider} from 'react-redux'

 import App from './app';
 import {counter} from './index.redux';
 
 //需要在浏览器安装redux调试器
 const  reduxDevtools=window.devToolsExtension?window.devToolsExtension():()=>{};
 const store=createStore(counter,compose(
      applyMiddleware(thunk),
      reduxDevtools
 ));

//将redux和react结合起来之后把要传的东西放到Provider即可
ReactDOM.render(
     <Provider store={store}>
         <App  />
      </Provider>,
    document.getElementById('root'));
```



### 3、主要插件介绍

##### 处理异步redux-thunk

>  处理异步、调试工具、更优雅的和react结合

* Redux处理异步、需要redux-thunk插件
* Npm install redux-devtools-extension并且开启(待查资料了解)
* 使用react-redux优雅的链接react和redux

> Redux默认只处理同步，异步处理需要react-thunk中间件

* Npm install redux-thunk  —save
* 使用applyMiddleware开启thunk中间件 
* Action可以返回函数，使用dispatch提交action 

#### 使用React-redux

> 为了方便管理，使用React来负责链接

* npm install  react-redux  —save 
* 忘记subscribe,记住reducer,action和dispathtch即可
* React-redux提供Provider和connect两个接口来链接 

#####  具体使用

* Provider组件在应用最外层，传入store即可，只用一次 
* Connect负责从外部获取组件需要的参数 
* Connect可以用装饰器的方式来写  

##### 使用装饰器优化connect代码

* Npm run eject弹出个性化配置
* Npm   install babel-plugin-transform-decorators-legacy  —save-dev插件
* Packge.json里babel加上plugins配置

```
 "babel":{
   "plugins": [
        "babel-plugin-transform-decorators-legacy"
    ] 
 } 
```



```
//使用插件前
const  mapStatetoProps=(state)=>{
    return {num:state};
}
const actionCreators={addGUN,removeGUN,addGunAsync};
App=connect(mapStatetoProps,actionCreators)(App);
```

```
//使用插件后
@connect(
    //你要state什么属性放到props里
    state=>({num:state}),
    //你要什么方法放到props里,自动dispatch
    {addGUN,removeGUN,addGunAsync}
)

```

 

#### React后续

* 什么数据应该放在React里
* Redux管理ajax
* Redux管理聊天数据




## 八、react-router4

> react官方推荐的路由库，4是最新版本，和之前版本不兼容，浏览器和RN均兼容

> react开发单页应用必备，践行路由即组件的概念

> 核心概念：动态路由、reute、link、switch

> Https://reacttraining.com/react-router/web/guides/philosophy

#### 1、安装

> npm install react-router-dom —save

#### 2 、组件

> browserRouter,包裹整个应用

> Route路由对应渲染的组件，可嵌套

> Link跳转专用

#### 3、其他组件

> url参数，route组件参数可用冒号标识参数

> Redirect组件 跳转

> Switch只渲染一个子Route组件

#### 4、合并reducer

>  复杂的redux应用，多个reducer,用combineReducers合并

> Redirect组件 跳转 

> Switch只渲染一个子Roure组件

















 











