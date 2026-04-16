const connection = require("../app/database")

class MomentService{
  async create(content,userId){
    const statement='INSERT INTO moment(content,user_id) VALUES(?,?)'
    const [result]=await connection.execute(statement,[content,userId])
    return result
  }

  async queryList(offset,size){
    // 使用反引号 `` 包裹，这样内部可以直接写单引号，且支持换行
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT(
        'id', u.id, 
        'name', u.name, 
        'createTime', u.createAt, 
        'updateTime', u.updateAt
      ) AS user
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
    LIMIT ? OFFSET ?;
  `;
    //这里也不能用execute，可能是因为它底层实现不能拉取太多数据吧
    const [result]=await connection.query(statement,[size,offset])
    return result
  }

  async queryById(id){
    // 使用反引号 `` 包裹，这样内部可以直接写单引号，且支持换行
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT(
        'id', u.id, 
        'name', u.name, 
        'createTime', u.createAt, 
        'updateTime', u.updateAt
      ) AS user
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
    WHERE m.id=?;
  `;
    //这里也不能用execute，可能是因为它底层实现不能拉取太多数据吧
    const [result]=await connection.query(statement,[id])
    return result
  }

  async update(content,id){
    const statement=`
      UPDATE moment
      SET content=?
      WHERE id=?
    `
    const [result]=await connection.execute(statement,[content,id])
    return result
  }

  async remove(id){
    const statement=`
      DELETE FROM moment
      WHERE id=?
    `
    const [result]=await connection.execute(statement,[id])
    return result
  }
}

module.exports=new MomentService()