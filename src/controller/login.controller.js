const jwt=require('jsonwebtoken')

const {PRIVATE_KEY}=require('../config/screct')


class LoginController{
  async sign(ctx,next){
    const {id,name}=ctx.user

    const token=jwt.sign({id,name},PRIVATE_KEY,{
      expiresIn:24*60*60,
      algorithm:'RS256'
    })

    //颁发令牌
    ctx.body={code:0,data:{id,name,token}}
  }

  test(ctx,next){
    ctx.body='可以访问login/test'
  }
}

module.exports=new LoginController()
