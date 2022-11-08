import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../App";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../slices/logIn";
const Logeado = ({ setHide }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  function handleLogOut() {
    signOut(auth);
    dispatch(logOut());
    setHide("-translate-y-full");
    navigate("/");
  }
  let img =
    "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";
  if (user.user_image.length) {
    img = user.user_image;
  }
  return (
    <div className="lg:mx-4 lg:ml-auto flex lg:flex-col justify-end items-center">
      <img
        onClick={() => {
          setHide("-translate-y-full");
          navigate("/user/perfil");
        }}
        src={img}
        alt="user pic"
        className="lg:static absolute top-4 right-4 h-8 bg-center cursor-pointer rounded-full"
      />

      <button
        className="lg:mt-0 mt-20 lg:mr-0 mr-4 text-xs "
        onClick={() => handleLogOut()}
      >
        Log Out
      </button>
    </div>
  );
};

export default Logeado;
