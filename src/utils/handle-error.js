const app=require("../app")
const {NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_ALREADY_EXIST,
  NAME_IS_NOT_EXIST,PASSWORD_IS_INCORRECT,UNAUTHOURIZATION}=require("../config/error")

app.on('error',(err,ctx)=>{
  let code = 0
  let message = ""
  switch(err){
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空' 
      break
    case NAME_IS_ALREADY_EXIST:
      code = -1002
      message = '用户已存在'
      break
    case NAME_IS_NOT_EXIST:
      code = -1003
      message = '用户不存在'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '密码错误'
      break
    case UNAUTHOURIZATION:
      code = -1005
      message = 'token无效'
      break
    default:
      code = 0
      message = '未知错误'
      break
  }
  ctx.body={code,message}
})
