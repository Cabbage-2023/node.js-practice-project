const fs=require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../config/path')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await userService.create(user)
    ctx.body = {
      message: '创建用户成功~',
      data: result
    }
  }

  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)

    //读取头像文件
    const {filename,mimetype}=avatarInfo
    ctx.body=fs.createReadStream(`${AVATAR_PATH}/${filename}`)
    ctx.type=mimetype
  }
}

module.exports = new UserController()