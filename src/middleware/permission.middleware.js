const permissionService=require('../service/premission.service')
const {OPERATION_IS_NOT_ALLOWED}=require('../config/error')


const verifyPermission=async (ctx,next)=>{
  const {id}=ctx.user
  //获取资源的name/id
  const keyName=Object.keys(ctx.params)[0]
  const resourceId=ctx.params[keyName]
  const resourceName=keyName.replace('Id','')

  const isPermission=await permissionService.checkResource(resourceId,resourceName,id)
  if(!isPermission) return ctx.app.emit('error',OPERATION_IS_NOT_ALLOWED,ctx)
  
  await next()
}

module.exports = { verifyPermission }
