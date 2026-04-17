const KoaRouter = require('@koa/router')

const labelRouter = new KoaRouter({prefix: '/label'})
const {verifyAuth} = require('../middleware/login.middleware')
const labelController = require('../controller/label.controller')

labelRouter.post('/',verifyAuth,labelController.create)
labelRouter.get('/',labelController.list)

module.exports = labelRouter