
export default function ReviewsProduct(props: any ){
console.log(props)
let stars:any=[]

props.reviews.map((r:any,j:number)=>{
    stars.push([]);
    for( let i=1;i<=r.rating;i++){stars[j].push("✰")}
  
})
console.log(stars)
return(
    <div className=" font-semibold mb-16">
        Comentarios:
        {props.reviews.map((r:any, j:number)=>{return(
            
            <div className="mt-4">
            <div>{r.comment}</div>
            <div>{stars[j].map((s: string,i:number)=>(<label key={i}>{s}</label>))}</div>
          
            </div>
    

        )})}

        <div className="mt-6">
            <label className="font-bold">Agrega un Comentario:</label> <br />
            <textarea name="comment" className=" rounded-xl w-10/12"></textarea>
            <div>
                <label> De 0 a 5, ¿Que tanto recomiendas el producto?  </label>
                <input type="number" min={0} max={5} defaultValue={5} className="rounded-xl text-center" /><br />
                <button className="m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black">
                    Comentar y calificar</button>
            </div>
        </div>

    </div>
    )
}