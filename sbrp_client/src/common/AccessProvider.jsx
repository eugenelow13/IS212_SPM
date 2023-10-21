import { createContext, useState } from "react";
import { getLoggedInUser } from "./sessionUtilities";
import { Navigate } from "react-router-dom";

export const AccessContext = createContext();

export function AccessProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getLoggedInUser() ?? "")

  const providerValue = {
    currentUser,
    setCurrentUser
  }

  return (
    <AccessContext.Provider value={providerValue}>
      {children}
    </AccessContext.Provider>
  )
}