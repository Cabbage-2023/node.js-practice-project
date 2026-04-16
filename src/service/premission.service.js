const connection=require('../app/database')

class PermissionService{
  // async checkMoment(momentId,userId){
  //   const statement=`SELECT * FROM moment WHERE id =? AND user_id =?`
  //   const [result]=await connection.query(statement,[momentId,userId])
  //   return Boolean(result.length)
  // }

  async checkResource(resourceId,resourceName,userId){
    const statement=`SELECT * FROM ${resourceName} WHERE id =? AND user_id =?`
    const [result]=await connection.query(statement,[resourceId,userId])
    return Boolean(result.length)
  }
}

module.exports=new PermissionService()