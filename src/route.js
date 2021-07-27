//importando  
const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

//criador de rotas
const route = express.Router()

// criando as rotas  

//quando for '/' passa a index
route.get('/', (req, res) => res.render("index", {page: 'enter-room'})) //page: 'enter-room' é uma variavel

//quando for '/create-pass' passa a create-pass
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

//quando for '/room' passa a room
route.post('/create-room', RoomController.create) //RoomController = Salas

//route.get('/room/:room', (req, res) => res.render("room"))
route.get('/room/:room', RoomController.open)

route.post('/enterroom', RoomController.enter)


//Ex: route.post('/room/323232/2/check')//sala, id da sala, check
// criando no post as variaveis que receberão as informações

//Formato que o formulario de dentro da modal tem que passar a informação
//route.get('/room/:room/:question/:action', (req, res) => res.render("exemplo", {req}))

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index) //QuestionController = Perguntas

module.exports = route



 