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
          'updateTime', u.updateAt,
          'avatarURL', u.avatar_url
        ) AS user
        ,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) AS commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id=m.id) AS labelCount
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
        -- 1. 关联作者 (一对一，直接查)
        JSON_OBJECT(
          'id', u.id, 
          'name', u.name, 
          'createTime', u.createAt, 
          'updateTime', u.updateAt,
          'avatarURL', u.avatar_url
        ) AS user,

        -- 2. 关联评论列表 (一对多，子查询内部打包)
        (SELECT 
          IF(COUNT(c.id), JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', c.id, 
              'content', c.content, 
              'commentId', c.comment_id,
              'createTime', c.createAt,
              'user', JSON_OBJECT('id', cu.id, 'name', cu.name,'avatarURL', u.avatar_url)
            )
          ), JSON_ARRAY())
          FROM comment c 
          LEFT JOIN user cu ON c.user_id = cu.id 
          WHERE c.moment_id = m.id
        ) AS comments,


        -- 3. 关联标签列表 (多对多，子查询内部打包)
        (SELECT 
          IF(COUNT(l.id), JSON_ARRAYAGG(
            JSON_OBJECT('id', l.id, 'name', l.name)
          ), JSON_ARRAY())
          FROM moment_label ml 
          JOIN label l ON ml.label_id = l.id 
          WHERE ml.moment_id = m.id
        ) AS labels

      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id=?
      GROUP BY m.id;
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

  async hasLabel(momentId,labelId){
    const statement=`
      SELECT * FROM moment_label
      WHERE moment_id=? AND label_id=?
    `
    const [result]=await connection.query(statement,[momentId,labelId])
    return Boolean(result.length)
  }

  async addLabel(momentId,labelId){
    const statement=`
      INSERT INTO moment_label(moment_id,label_id)
      VALUES(?,?)
    `
    const [result]=await connection.execute(statement,[momentId,labelId])
    return result
  }
}

module.exports=new MomentService()