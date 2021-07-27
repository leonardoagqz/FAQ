const Database = require("../db/config") // importando o banco de dados para poder utilizar e fazer o insert


module.exports = {
    async create(req, res){
        const db = await Database() //passando o banco para db
        const pass = req.body.password
        let roomId 
        let isRoom = true


        while(isRoom){
        
            //gerando o número da sala
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            //verificar se o número da sala já existe cadastrado no banco

            //fazendo consulta pelo id no banco e passando para variavel
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            
            //seria retornado um array com varios true, não é a melhor opção
            //roomsExistIds.map(roomExistId => {roomExistId === roomId return true})

            //utilizando o some ele verifica a condição e retorna um true
            //o some vai verificar id por id comparando com o roomExistId, a primeira que for igual ele retorna true
            //passando para variavel isRoom que será verificada no while
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            //if não existir id cadastrado no banco
            if(!isRoom){
                
                //gravando a sala no banco
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                )VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`) 
            }

        } 
      
        await db.close()

        res.redirect(`/room/${roomId}`)
    },
  
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length ==0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)

    }
}