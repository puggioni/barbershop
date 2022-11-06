import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../slices/logIn";
import { clearFavorites } from "../slices/productSlice";
const Logeado = ({ setHide }: any) => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  function handleLogOut() {
    signOut(auth);
    dispatch(clearFavorites());
    dispatch(logOut());
    setHide("-translate-y-full");
    navigate("/");
  }
  const img: any =
    auth.currentUser !== null
      ? auth.currentUser.photoURL
      : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  return (
    <div className=" lg:grid flex lg:grid-cols-2 justify-end items-center">
      <img
        onClick={() => {
          setHide("-translate-y-full");
          navigate("/user/perfil");
        }}
        src={img}
        alt="user pic"
        className="lg:static absolute top-4 left-4 h-8 bg-center rounded-full"
      />

      <button
        className="lg:mt-0 mt-20 lg:mr-0 mr-4 "
        onClick={() => handleLogOut()}
      >
        Log Out
      </button>
    </div>
  );
};

export default Logeado;
