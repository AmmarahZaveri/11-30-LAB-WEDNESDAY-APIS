const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {CONNECTION_URL}= process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_URL, {
    dialect : 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorization:false
        }
    }
});

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(express.json())
app.use(cors(corsOptions))


let questions = [
    {
        question: ' Which Country Owns Every Panda In The World?',
        choice1: 'Japan',
        choice2: 'China',
        choice3: 'America',
        choice4: 'Canada',
        answer: 2,
    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'What percent of American adults believe that choclate milk comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: 3,
    },
    {
        question: "What's The Total Number Of Dots On A Pair Of Dice?",
        choice1: '42',
        choice2: '60',
        choice3: '54',
        choice4: '100',
        answer: 1,
    },
    {
        question: "What is the only food that cannot go bad?",
        choice1: 'Dark chocolate',
        choice2: 'Peanut Butter',
        choice3: 'Canned Tuna',
        choice4: 'Honey',
        answer: 4,
    },
]


//app.post('/a')
app.get('/api/questions', function(req, res){
    res.status(200).send(questions)

})

app.post('/api/seed', function(req,res) {
    sequelize.query(`
    create table leaderboard (
        score_id serial primary key, 
        username varchar(255),
        score int
    );
    `).then(() => {
        console.log('seeded')
        res.sendStatus(200)
})})
app.delete('/api/clearLeaderboard',function(req,res){
    sequelize.query(`
    DELETE FROM leaderboard;
    `)
})
app.post('/api/addToLeaderboard', function(req,res){
    let {score, name} = req.body
    sequelize.query(`
    insert into leaderboard(username,score)
    values('${name}','${score}')
    
    `).then(res.sendStatus(200))

})
app.get('/api/getScores', function(req,res){
    sequelize.query(`
    select * from leaderboard  
    order by score DESC  
    `).then(dbres => res.send(dbres[0]).status(200))

})

app.listen(4000, function(){
    console.log("Server running on 4000")
})