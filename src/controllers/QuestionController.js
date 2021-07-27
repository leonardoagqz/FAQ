//importando banco de dados
const Database = require('../db/config')


module.exports = {

    async index(req, res){
        //alimentando as variaveis
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password //pegando a senha na /room/modal passeord

        //executar um console log pra mostrar no terminal a senha digitada
        //transformando em templat string `` passando as variaveis
        //console.log(`room = ${roomId}, questionId = ${questionId}
        //action = ${action}, password = ${password}`) 

        //verificar se a senha está correta
        //const verifyRoom = db.all(`SELECT * FROM rooms HERE id = ${roomId}`) //.all tras todos os dados
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)// .get só tras 1 dado
        if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            } 
            res.redirect(`/room/${roomId}`)         
        }else{
            res.render(`passincorrect`, {roomId: roomId})
        }

        

    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        //criando a pergunta

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        
        )`)

        res.redirect(`/room/${roomId}`)        
    }
}
