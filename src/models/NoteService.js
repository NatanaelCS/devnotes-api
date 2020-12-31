const db = require('../db');

module.exports = {
  // aqui ficam as funções
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM notes', (error, res) => {
        if(error) {
          reject(error);
          return;
        } // verifica se deu erro

        resolve(res); // se não der erro vai receber o resultado
      }) // aqui vai pegar todas as informações da tabela, o segundo parametro de query é o que vai fazer algo com a tabela
    }); // tem dois parâmetros, o resolve que é a resposta e o reject para quando tiver erro
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM notes WHERE id = ?', [id], (error, res) => {
        if(error) {
          reject(error);
          return;
        } // verifica se deu erro

        if(res.length > 0) { // aqui verifica se tem algum resultado
          resolve(res[0]); // aqui retorna apenas o primeiro resultado encontrado
        } else {
          resolve(false); // caso contrario não retorna nada
        }
      }) // pega um objeto usando o id, e faz algo com ele.
    })
  },
  add: (title, body) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO notes (title, body) VALUES (?, ?)', 
        [title, body],
        (error, res) => {
          if(error) {
            reject(error);
            return;
          } // verifica se deu erro

          resolve(res.insertId); // adiciona um novo id
        }
      ) // vai inserir as informações na tabela
      
    })
  },
  update: (id, title, body) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE notes SET title = ?, body = ? WHERE id = ?',
        [title, body, id],
        (error, res) => {
          if(error) {
            reject(error);
            return;
          } // verifica se deu erro

          resolve(res);
        }  
      )  
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM notes WHERE id = ?', 
        [id],
        (error, res) => {
          if(error) {
            reject(error);
            return;
          } // verifica se deu erro
          
          resolve(res);
        }  
      ) 
    })
  }
};