type Props={
use5050:()=>void
useAudience:()=>void
}

export default function Lifelines({use5050,useAudience}:Props){

return(

<div className="flex gap-4 mt-6">

<button
onClick={use5050}
className="bg-yellow-500 text-black px-4 py-2 rounded"
>
50:50
</button>

<button
onClick={useAudience}
className="bg-green-500 px-4 py-2 rounded"
>
Hỏi khán giả
</button>

</div>

)

}