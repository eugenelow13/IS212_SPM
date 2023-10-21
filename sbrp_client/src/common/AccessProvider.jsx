import { createContext, useState } from "react";

export const AccessContext = createContext();

export function AccessProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

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