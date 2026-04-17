const labelService=require('../service/label.service')

//传入labels时，不确定有的label是否在表里存在
//所以需要把所有的label存在表里，获取label的id
//然后把数据传递给下一个中间件
const verifyLabelExists=async (ctx,next)=>{
  //拿到客户端传过来的label
  const {labels}=ctx.request.body
  //判断所有的labels是否已经存在于label表
  const newLabels=[]
  for(const name of labels){
    const result=await labelService.queryLabelByName(name)
    const labelObj={name}
    if(result){//获取name对应的labelId
      labelObj.id=result.id
    }
    else{//插入name，并且获取插入之后的labelId
      const insertResult=await labelService.create(name)
      labelObj.id=insertResult.insertId
    }
    newLabels.push(labelObj)
  }
  //所有的labels都变成[{name:'xx',id:x},...]的格式
  ctx.labels=newLabels

  await next()
}

module.exports={
  verifyLabelExists
}