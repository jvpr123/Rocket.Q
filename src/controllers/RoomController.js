const Database = require('../db/config');

module.exports = {

    async create(req, res) {

        const db = await Database();
        const pass = req.body.password;

        let roomId = null;
        let isRoom = true;

        while(isRoom){

            // Gera número aleatório para a nova sala
            for(var i = 0; i < 6; i++){
            
                roomId == null ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString();
            }
    
            // Verifica se númeoro da sala já existencia
            const roomsExistId = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistId.some(roomExistId => roomsExistId === roomId);

            // Inclui número da sala e senha no DB
            if(!isRoom) {

                await db.run(`INSERT INTO rooms (id, pass) 
                VALUES (${parseInt(roomId)}, ${pass})`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    },

    async open(req, res) {

        const db = await Database();
        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`);
        
        let  isNoQuestion;

        if(questions.length == 0) {
            if(questionsRead.length == 0) {
                isNoQuestions = true;
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestion: isNoQuestion});
    },

    enter(req, res) {

        const roomId = req.body.roomId;
        res.redirect(`/room/${roomId}`);
    }
}