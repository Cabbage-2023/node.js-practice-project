const KoaRouter=require("@koa/router")

const userController = require("../controller/user.controller")
const userRouter=new KoaRouter({prefix:'/users'})
const {verifyUser,handlePassword}=require("../middleware/user.middleware")

//用户注册接口
userRouter.post('/',verifyUser,handlePassword,userController.create)

module.exports=userRouter