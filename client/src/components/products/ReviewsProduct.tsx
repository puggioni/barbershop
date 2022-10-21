import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function ReviewsProduct(props: any ){
    const dispatch=useAppDispatch();
    let stars:any=[]
   // let idProduct=props.idProduct
    const initialRating={
        idProduct:props.idProduct,
        comment:"",
        rating:"5"
    }

    function handleComentar(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        
    }
    function handleChange(e:any){
        e.preventDefault();
        console.log(e.target)
    }


props.reviews.map((r:any,j:number)=>{
    stars.push([]);
    for( let i=1;i<=r.rating;i++){stars[j].push("✰")}
  
})
//console.log(stars)
return(
    <div className=" font-semibold mb-16">
        Comentarios:
        {props.reviews.map((r:any, j:number)=>{return(
            
            <div className="mt-4" key={j}>
            <div>{r.comment}</div>
            <div>{stars[j].map((s: string,i:number)=>(<label key={i}>{s}</label>))}</div>
            <hr className="border-black border-1 w-full rounded-md" />
            </div>
            

        )})}

        <div onChange={(e)=>handleChange(e)} className="mt-6">
            <label className="font-bold">Agrega un Comentario:</label> <br />
            <textarea name="comment" className=" rounded-xl w-10/12"></textarea>
            <div >
                <label> De 0 a 5, ¿Que tanto recomiendas el producto?  </label>
                <input name="rating" type="number" min={0} max={5} defaultValue={5} className="rounded-xl text-center" /><br />
                <button onClick={(e)=>handleComentar(e)} className="m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black">
                    Comentar y Calificar</button>
            </div>
        </div>

    </div>
    )
}