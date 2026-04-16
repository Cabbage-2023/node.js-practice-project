const KoaRouter=require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')
const momentController=require('../controller/moment.controller')
const {verifyPermission} = require('../middleware/permission.middleware')

const momentRouter=new KoaRouter({prefix:'/moment'})

// 创建moment
momentRouter.post('/',verifyAuth,momentController.create)
// 获取moment列表
momentRouter.get('/',momentController.list)
momentRouter.get('/:momentId',momentController.detail)
// 更新moment
momentRouter.patch('/:momentId',verifyAuth,
  verifyPermission,momentController.update)
// 删除moment
momentRouter.delete('/:momentId',verifyAuth,
  verifyPermission,momentController.remove)

module.exports=momentRouter