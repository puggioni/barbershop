import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {useState} from "react"
import { reviewProduct } from "../slices/productSlice";
export default function ReviewsProduct(props: any ){
    const dispatch=useAppDispatch();
    let stars:any=[]
  
    const initialReview={
        productId:props.idProduct,
        comment:"",
        rating:"5"
    }
    const [review,setReview]=useState(initialReview);

    function handleComentar(e:React.FormEvent<HTMLButtonElement>){
        e.preventDefault();
        if(review.comment&&review.rating){
            if(parseInt(review.rating)>5||parseInt(review.rating)<0) alert("Calificacion entre 0 y 5")
            else{
            let token=""
            let aux=window.localStorage.getItem("token")
            aux? token=aux : alert("necesitas loguearte para comentar")
           // console.log(token)
            const config={
                headers:{
                    token: JSON.parse(token),  
                  }
            }
            dispatch(reviewProduct(review,config));
            setReview(initialReview);
        }
        }else{
            alert("Coloca un comentario y una evaluacion del producto")
        }
    }
    function handleChange(e:any){
        e.preventDefault();
        setReview({
            ...review,
            [e.target.name]:e.target.value
        })
        //console.log(review)
    }


props.reviews.map((r:any,j:number)=>{
    stars.push([]);
    for( let i=1;i<=r.rating;i++){stars[j].push("✰")}
  
})

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
            <textarea value={review.comment} name="comment" className=" rounded-xl w-10/12"></textarea>
            <div >
                <label> De 0 a 5, ¿Que tanto recomiendas el producto?  </label>
                <input value={review.rating} name="rating" type="number" min={0} max={5} defaultValue={5} className="rounded-xl text-center" /><br />
                <button type="submit" onClick={(e)=>handleComentar(e)} className="m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black">
                    Comentar y Calificar</button>
            </div>
        </div>

    </div>
    )
}