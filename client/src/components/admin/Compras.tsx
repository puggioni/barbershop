import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { yaLog } from "../slices/logIn";
const user = JSON.parse(window.localStorage.getItem("user") || "{}");

const Compras = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Compras</div>;
};

export default Compras;
