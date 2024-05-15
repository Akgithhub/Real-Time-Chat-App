import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnload();
  }, []);

  const getUserOnload = async () => {
    try {
      const accountDetails = await account.get();
      console.log("Account Details: ", accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.info(error);
    }
    setloading(false);
  };
  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      console.log("Loged: ", response);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleUserLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };
  const HandleUserRegister = async (e, credentials) => {
    e.preventDefault();
    if (credentials.password1 !== credentials.password2) {
      alert("Password do not match!");
      return;
    }
    try {
      let res = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password1
      );
      const accountDetails = await account.get();
      console.log("Account Details: ", accountDetails);
      setUser(accountDetails);
      navigate("/");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    HandleUserRegister,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
export const userAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
