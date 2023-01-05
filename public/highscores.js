const highScoresList = document.querySelector('#highScoresList')
const clear = document.querySelector('#leaderboardClear')


function getHighScores(){
    axios.get('http://localhost:4000/api/getScores')
    .then(res => {
        // console.log(res.data)
        highScoresList.innerHTML =
        res.data.map(score =>{
            return `<li class="high-score">${score.username} - ${score.score}</li>`
        
        }).join('')})
}
function leaderboardClear(){
    axios.delete('http://localhost:4000/api/clearLeaderboard')
    .then(window.location.reload())
}
clear.addEventListener('click',leaderboardClear)
getHighScores()