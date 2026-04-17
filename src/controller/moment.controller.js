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


  async addLabels(ctx,next){
    //获取参数
    const {momentId}=ctx.params
    const labels=ctx.labels

    //将momentId和labelId添加到关系表
    try {
      const results = []; // 用一个数组记录所有操作结果
      for(const label of labels){
        //判断labelId和momentId的关系是否已经存在
        const isExists=await momentService.hasLabel(momentId,label.id)
        if(!isExists){
          //添加到关系表
          const result=await momentService.addLabel(momentId,label.id)
          results.push(result);
        }
      }
      ctx.body={
        code:0,
        message:'添加用户动态标签成功',
        data:results
      }

    } catch (error) {
      console.log(error);
      ctx.body={
        code:-3001,
        message:'添加用户动态标签失败',
        data:error
      }
    }
  }
}

module.exports=new MomentController()