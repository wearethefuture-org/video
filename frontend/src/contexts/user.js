import React, { useState } from 'react';

export const UserContext = React.createContext({
  user: null,
  event_id: null,
  loggedIn: false,
  email:null,

  setUser: () => {},
})

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    user: null,
    event_id: null,
    loggedIn: false,
    email:null,
  })

  const setUser = userData => {
    setUserState({ ...userState, ...userData })
  }
  
  return (
    <UserContext.Provider
      value={{
        ...userState,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}