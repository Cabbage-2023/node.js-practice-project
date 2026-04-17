const fileService=require('../service/file.service')
const userService=require('../service/user.service')
const { SERVER_HOST, SERVER_PORT } = require('../config/server')

class FileController{
  async create(ctx,next){
    //获取上传的文件信息
    const {filename,mimetype,size}=ctx.request.file
    const {id}=ctx.user
    console.log(filename,mimetype,size,id)

    const result=await fileService.create(filename,mimetype,size,id)
    console.log(result)
    //将头像的地址，存在user表里
    const avatarUrl=`${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    console.log(avatarUrl)
    const result2=await userService.updateUserAvatar(avatarUrl,id)
    console.log(result2)
    
    ctx.body={
      code:0,
      message:'上传成功',
      data:avatarUrl
    }
  }
}

module.exports=new FileController()
