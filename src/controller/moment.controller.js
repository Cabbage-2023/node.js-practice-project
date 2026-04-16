const { queryList } = require("../service/moment.service")
const momentService = require("../service/moment.service")

class MomentController{
  async create(ctx,next){
    //获取动态内容
    const {content}=ctx.request.body
    //动态由谁发布
    const {id}=ctx.user
    //保存到数据库
    const result=await momentService.create(content,id)
    
    ctx.body={
      code:0,
      msg:'创建用户动态成功',
      data:result
    }
  }

  async list(ctx,next){
    //获取查询参数
    let { offset = 0, size = 5 } = ctx.query;
    //从数据库中查询动态列表
    const result=await momentService.queryList(parseInt(offset),parseInt(size))
    ctx.body={
      code:0,
      data:result
    }
  }

  async detail(ctx,next){
    const {momentId}=ctx.params
    const result=await momentService.queryById(momentId)
    ctx.body={
      code:0,
      data:result[0]
    }
  }

  async update(ctx,next){
    const {momentId}=ctx.params
    const {content}=ctx.request.body
    const result=await momentService.update(content,momentId)
    ctx.body={
      code:0,
      msg:'更新用户动态成功',
      data:result
    }
  }

  async remove(ctx,next){
    const {momentId}=ctx.params
    const result=await momentService.remove(momentId)
    ctx.body={
      code:0,
      msg:'删除用户动态成功',
      data:result
    }
  }
}

module.exports=new MomentController()