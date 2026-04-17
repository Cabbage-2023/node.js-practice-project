const connection=require('../app/database')

class FileService{
  async create(filename,mimetype,size,userId){
    const statement='INSERT INTO avatar(filename,mimetype,size,user_id) VALUES(?,?,?,?);'
    const [result]=await connection.query(statement,[filename,mimetype,size,userId])
    return result
  }

  async queryAvatarWithUserId(userId){
    const statement='SELECT filename,mimetype,size FROM avatar WHERE user_id=?;'
    const [result]=await connection.query(statement,[userId])
    return result.pop()//返回最新的头像
  }
}

module.exports=new FileService()