const express = require('express'); // importa módulo express
const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const route = express.Router(); // configura em route todas as funcionalidade de acesso a rotas do Express

route.get('/', (req, res) => res.render("index", {page: 'enter-room'})); //define qual a rota será utilizada para que index seja visualizado
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}));

route.get('/room/:room', RoomController.open);
route.post('/create-room', RoomController.create);
route.post('/enterroom', RoomController.enter);

route.post('/question/:room/:question/:action', QuestionController.index);
route.post('/question/create/:room', QuestionController.create)

module.exports = route; // exporta a const route para que o server possa encontra-la

