const fs=require('fs')

function  registerRouters(app){
  //读取当前文件夹下所有文件
  const files=fs.readdirSync(__dirname)
  //遍历所有文件
  files.forEach(file=>{
    if(file.indexOf('.router')===-1) return
    const router=require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  })

}

module.exports=registerRouters