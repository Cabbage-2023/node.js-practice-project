//导入app
const app=require('./app/index')
const {SERVER_PORT}=require('./config/server')

//启动app
app.listen(SERVER_PORT,()=>{
  console.log('coderhub服务器启动成功')
})