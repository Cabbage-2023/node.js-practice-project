const jwt=require('jsonwebtoken')


const {NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRECT,UNAUTHOURIZATION}=require('../config/error')
const userService=require('../service/user.service')
const md5Password = require('../utils/md5-password')
const {PUBLIC_KEY}=require('../config/screct')



const verifyLogin=async(ctx,next)=>{
  const {name,password}=ctx.request.body
  //非空
  if(!name||!password){
    return ctx.app.emit("error",NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }
  //是否存在
  const users=await userService.findUserByName(name)
  const user=users[0]
  if(!user) return ctx.app.emit('error',NAME_IS_NOT_EXIST,ctx)
  //是否一致
  if(user.password!== md5Password(password)) return ctx.app.emit('error',PASSWORD_IS_INCORRECT,ctx)
  //将user信息存到ctx里
  ctx.user=user
  await next()
}

const verifyAuth=async(ctx,next)=>{
  //获取token
  const authorization=ctx.headers.authorization
  const token=authorization.replace('Bearer ','')
  //验证token
  try {
    const result=jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    })
    //将token信息存到ctx里
    ctx.user=result
    //继续执行下一个中间件
    await next()
  } catch (error) {
    ctx.app.emit('error',UNAUTHOURIZATION,ctx)
  }
}

module.exports={verifyLogin,verifyAuth}