import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (component, option, adminRoute = null) {
  //option - null: everyone / true: only logged in / false: only not logged in
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          // not logged in
          if (option) {
            props.history.push("/login");
          }
        } else {
          //logged in
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else if (!option) {
            props.history.push("/");
          }
        }
      });
    }, []);
    return <component {...props} user={user} />;
  }
  return AuthenticationCheck;
}
