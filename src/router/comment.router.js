const KoaRouter=require('@koa/router')

const {verifyAuth}=require('../middleware/login.middleware')
const commentController=require('../controller/comment.controller')


const CommentRouter=new KoaRouter({prefix:'/comment'})

//发表评论
CommentRouter.post('/',verifyAuth,commentController.create)
//回复评论
CommentRouter.post('/reply',verifyAuth,commentController.reply)

module.exports=CommentRouter