import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AdminOptions from "../admin/AdminOptions";
import { isAdmin } from "../slices/admin";

const Perfil = () => {
  const token: any = JSON.parse(window.localStorage.getItem("token") || "{}");
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  const dispatch = useAppDispatch();
  const { adminAuth } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(isAdmin(token));
  });

  const img = user?.user_image.length
    ? user.user_image
    : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  return (
    <div className="text-slate-200 grid ">
      <Link to="/">Home</Link>
      <img className="rounded-full h-1/2 w-1/4 " src={img} alt="user pic" />
      <p>{user.name}</p>
      {adminAuth && <AdminOptions />}
    </div>
  );
};

export default Perfil;
