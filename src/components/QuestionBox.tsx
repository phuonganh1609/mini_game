"use client"

export default function QuestionBox({question}:{question:string}){

return(

<div className="bg-blue-800 border-4 border-blue-400 
px-10 py-6 rounded-full text-xl text-center max-w-2xl mb-10">

{question}

</div>

)

}