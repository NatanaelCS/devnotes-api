const mysql =require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if(error) throw error;
  console.log(`Conectado ao DB: ${process.env.DB_NAME}`)
}) // aqui verifica se tem erro, caso não tenha vai mostrar a mensagem de conectado

module.exports = connection; // para pode usar tudo conectado