import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { reviewProduct } from "../slices/productSlice";

export default function ReviewsProduct(props: {
  idProduct: string | undefined;
  reviews: any[] | undefined;
}) {
  const dispatch = useAppDispatch();
  let stars: any = [];

  const initialReview = {
    productId: props.idProduct,
    comment: "",
    rating: "5",
  };
  const [review, setReview] = useState(initialReview);
  const [error, setError] = useState<string | undefined>();

  props.reviews?.forEach((r: any, j: number) => {
    stars.push([]);
    for (let i = 1; i <= r.rating; i++) {
      stars[j].push("✰");
    }
  });

  // ==========================handlers=================================
  function handleComentar(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (review.comment && review.rating) {
      if (parseInt(review.rating) > 5 || parseInt(review.rating) < 0)
        alert("Calificacion entre 0 y 5");
      else {
        let token = "";
        let aux = window.localStorage.getItem("token");
        aux ? (token = aux) : alert("necesitas loguearte para comentar");
        const config = {
          headers: {
            token: JSON.parse(token),
          },
        };
        dispatch(reviewProduct(review, config));
        setReview(initialReview);
      }
    } else {
      alert("Coloca un comentario y una evaluacion del producto");
    }
  }

  function handleChange(e: any) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
    e.target.value.length > 100
      ? setError("El comentario debe tener entre 1 y 100 caracteres")
      : setError("");
  }

  // =======================render==========================================
  return (
    <div className="my-16 flex flex-col gap-8">
      {props.reviews?.length ? (
        props.reviews?.map((r: any, j: number) => {
          return (
            <div className="mt-4" key={j}>
              <div>{r.comment}</div>
              <div>
                {stars[j].map((s: string, i: number) => (
                  <label key={i}>{s}</label>
                ))}
              </div>
              <hr className="border-black border-1 w-10/12 rounded-md" />
            </div>
          );
        })
      ) : (
        <p> Sin comentario. Sea el primero en comentar</p>
      )}
      <div onChange={(e) => handleChange(e)} className="mt-6">
        <div className="flex flex-col mb-4">
          <label className="font-bold">Agrega un Comentario:</label>
          <textarea
            value={review.comment}
            name="comment"
            className={`rounded-lg w-10/12 p-2 border border-black h-[10vh] outline-none ${
              error?.length ? "border-red-500" : ""
            }`}
          />
          <p>{error}</p>
        </div>
        <div>
          <label>De 0 a 5, ¿Que tanto recomiendas el producto? </label>
          <input
            value={review.rating}
            name="rating"
            type="number"
            min={0}
            max={5}
            defaultValue={5}
            className="text-center ml-4 pl-2 border border-black"
          />
          <br />
          <button
            type="submit"
            onClick={(e) => handleComentar(e)}
            className="text-[#855C20] border border-[#855C20] mt-8 py-1 px-10 "
          >
            Comentar y Calificar
          </button>
        </div>
      </div>
    </div>
  );
}
