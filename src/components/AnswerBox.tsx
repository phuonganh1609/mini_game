"use client"

type Props={
text:string
onClick:()=>void
}

export default function AnswerButton({text,onClick}:Props){

return(

<button
onClick={onClick}
className="bg-blue-700 hover:bg-yellow-500 hover:text-black
border-2 border-blue-300 px-6 py-4 rounded-full text-lg transition"
>

{text}

</button>

)

}