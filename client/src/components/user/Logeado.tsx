import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../slices/logIn";

const Logeado = () => {
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  function handleLogOut() {
    signOut(auth);
    dispatch(logOut());
  }
  const img = user?.user_image?.length
    ? user.user_image
    : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  return (
    <div className=" grid grid-cols-3 items-center gap-2">
      <img
        onClick={() => navigate("/user/perfil")}
        src={img}
        alt="user pic"
        className="h-10 w-10 cursor-pointer	 rounded-full "
      />

      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  );
};

export default Logeado;
