import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const Auth: React.FunctionComponent<any> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthCheck();
    return AuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      navigate("/");
    }
  });
  if (loading) return <p>Loading ....</p>;
  return <>{children}</>;
};

export default Auth;
