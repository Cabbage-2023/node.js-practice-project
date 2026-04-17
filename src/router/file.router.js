const KoaRouter=require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const fileController=require('../controller/file.controller')

const fileRouter=new KoaRouter({prefix:'/file'})

fileRouter.post('/avatar',verifyAuth,handleAvatar,fileController.create)  

module.exports=fileRouter
