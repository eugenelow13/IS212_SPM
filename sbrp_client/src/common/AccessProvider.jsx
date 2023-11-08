import { createContext, useState } from "react";

export const AccessContext = createContext();

export function AccessProvider({ children }) {
  const [accessControl, setAccessControl] = useState(sessionStorage.getItem("accessControl"));

  const providerValue = {
    accessControl,
    setAccessControl
  }

  return (
    <AccessContext.Provider value={providerValue}>
      {children}
    </AccessContext.Provider>
  )
}