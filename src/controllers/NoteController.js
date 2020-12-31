const NoteSevice = require('../models/NoteService');

module.exports = {
  ping: ( req, res ) => {
    res.json({ pong: true });
  },
  all: async ( req, res ) => {
    let json = { error: '', result: [] }; // preenche o resultado

    let notes = await NoteSevice.getAll();// função para pegas todas as notas

    for(let i in notes) {
      json.result.push({
        id: notes[i].id,
        title: notes[i].title
      });
    } // vai fazer um loop em notes e preencher result

    res.json(json);
  },
  one: async ( req, res ) => {
    let json = { error: '', result: {} }; // preenche o resultado retornando apenas um objeto

    let id = req.params.id; // vai pegar através do id
    let note = await NoteSevice.findById(id); // função a ser criada no NoteService para pegar apenas um

    if(note) {
      json.result = note;
    } // se tiver vai ficar em nota

    res.json(json);
  },
  new: async ( req, res ) => {
    let json = { error: '', result: {} }; // vai ser em forma de objeto

    let title = req.body.title; // para pegar os parâmetros da requisição, no caso title e body
    let body = req.body.body;

    if(title && body) {
      let noteId = await NoteSevice.add(title, body); // função de criação

      json.result = {
        id: noteId,
        title,
        body
      }; // para preencher o objeto com os novos dados
    } else {
      json.error = 'Campos não enviados'; // caso não coloque nada vai dar esse erro
    }

    res.json(json);
  },
  edit: async ( req, res ) => {
    let json = { error: '', result: {} }; // vai ser em forma de objeto

    let id = req.params.id; // para pegar o id
    let title = req.body.title; // para pegar os parâmetros da requisição, no caso title e body
    let body = req.body.body;

    if(id && title && body) {
      await NoteSevice.update(id, title, body); // função de alteração

      json.result = {
        id,
        title,
        body
      }; // para preencher o objeto com os novos dados
    } else {
      json.error = 'Campos não enviados'; // caso não coloque nada vai dar esse erro
    }

    res.json(json);
  },
  delete: async ( req, res ) => {
    let json = { error: '', result: {} }; // vai ser em forma de objeto

    await NoteSevice.delete(req.params.id); //função para deletar

    res.json(json);
  },
};