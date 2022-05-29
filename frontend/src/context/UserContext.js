import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { register, authenticated, logout } = useAuth();

  return <Context.Provider value={{ register, authenticated, logout }}>{children}</Context.Provider>;
};

export { Context, UserProvider };