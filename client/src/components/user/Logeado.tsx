import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../slices/logIn";

const Logeado = () => {
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  const dispatch = useAppDispatch();
  const auth = getAuth()

  function handleLogOut() {
    signOut(auth)
    dispatch(logOut());
  }
  const img = user?.user_image?.length
    ? user.user_image
    : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  return (
    <div className="absolute top-18 right-8 flex flex-col items-center ">
      <img
        src={img}
        alt="user profile pic"
        className="h-16 w-16 rounded-full my-4"
      />
      <p>{user.name}</p>
      <Link to={"/user/perfil"} className=" text-cyan-600 mt-2">
        perfil
      </Link>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  );
};

export default Logeado;
