const KoaRouter=require("@koa/router")
const { request } = require("../app")

const userRouter=new KoaRouter({prefix:'/users'})

//用户注册接口
userRouter.post('/',(ctx,next)=>{
  const user=ctx.request.body
})

module.exports=userRouter