const fs=require('fs')
const path=require('path')

const PRIVATE_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
//路径需要从根目录开始写，否则会报错
const PUBLIC_KEY=fs.readFileSync('./src/config/keys/public.key','utf8')

module.exports={
  PRIVATE_KEY,
  PUBLIC_KEY
}
