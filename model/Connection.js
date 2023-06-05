const mysql=require('mysql2/promise')

const Connection=mysql.createPool({
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER
})

module.exports=Connection