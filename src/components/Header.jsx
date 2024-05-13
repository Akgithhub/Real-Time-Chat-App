import React from "react";
import { LogOut } from "react-feather";
import { userAuth } from "../utiles/AuthContext";

const Header = () => {
  const { user, handleUserLogout } = userAuth();
  return (
    <>
      <div id="header--wrapper">
        {user ? (
          <>
            Welcome {user.name}
            <LogOut
              className="header--link"
              onClick={handleUserLogout}
            ></LogOut>
          </>
        ) : (
          <button>Login</button>
        )}
      </div>
    </>
  );
};

export default Header;
