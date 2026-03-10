export type Score={
name:string
score:number
}

export function getLeaderboard():Score[]{
const data = localStorage.getItem("millionaire_scores")
return data ? JSON.parse(data) : []
}

export function saveScore(name:string,score:number){

const scores = getLeaderboard()

scores.push({name,score})

scores.sort((a,b)=>b.score-a.score)

localStorage.setItem(
"millionaire_scores",
JSON.stringify(scores.slice(0,10))
)

}