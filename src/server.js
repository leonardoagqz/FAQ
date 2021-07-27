//importando o express
const express = require('express')

const route = require('./route')
const path = require('path') 

//Guardando o express no server
const server = express()

server.set('view engine', 'ejs')

server.use(express.static("public"))

//informando ao express qual o caminho para achar o arquivo .ejs
//.../nlw6together/src/views
server.set('views', path.join(__dirname, 'views'))

//configurando um middleware 
//o middleware esta entre a rota e pra onde a rota envia
//o middleware deve ser configurado antes da rota/acima da rota
//esta sendo necessario configurar um middleware pq vamos enviar a modal pra rota
//então nesse caso o middleware recebe a modal e passa pra rota
//tudo isso pra pegar o conteudo que esta vindo do fomulario'modal/password', decodificar e passar pro controller/rota
server.use(express.urlencoded({extended: true}))

//express usa o arquivo route
server.use(route)

//aerofunction é uma forma simplificada para fazer pequenas funções
server.listen(3000, () => console.log("Executando..."))