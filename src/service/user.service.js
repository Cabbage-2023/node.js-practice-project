const connection = require('../app/database');

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);';
    // 保持使用 [result] 解构
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    // 这里不知道为什么用execute会报错,所以用query
    const [values] = await connection.query('SELECT * FROM `user` WHERE `name` = ?', [name]);
    return values;
  }

  async updateUserAvatar(avatarUrl,userId) {
    const statement = 'UPDATE `user` SET `avatar_url` = ? WHERE `id` = ?;'
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService();