const userService = require('../service/user.service')
const {NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_ALREADY_EXIST}=require("../config/error")
const md5Password=require("../utils/md5-password")


const verifyUser=async (ctx,next)=>{
  const { name, password } = ctx.request.body
  // 1. 验证必填
  if (!name || !password) {
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }
  // 2. 判断是否已经存在
  const users = await userService.findUserByName(name)
  if (users && users.length) {
    return ctx.app.emit('error',NAME_IS_ALREADY_EXIST,ctx)
  }
  // 3. 执行下一个中间件
  await next()
}

const handlePassword=async (ctx,next)=>{
  //取出密码
  const{password}=ctx.request.body
  //加密密码
  ctx.request.body.password=md5Password(password)
  //执行下一个中间件
  await next()
}

module.exports={
  verifyUser,
  handlePassword
}
