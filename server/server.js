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



//新增数据
// User.create({
//     user:'imook',
//     age:18
// },function (err,doc) {
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })


//删除数据
// User.remove({age:18},function (err,doc) {
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })


//更新数据
// User.update({'_id': "5a38aad630669b2457f2e14f"},{'$set':{'user':'kejing'}},function (err,doc) {
//       if(!err){
//           console.log(doc)
//       }else{
//
//       }
//     }
// )



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