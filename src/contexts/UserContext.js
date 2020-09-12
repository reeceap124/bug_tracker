import React, {createContext, useContext} from 'react';
const UserContext = createContext();
export function useUser() {
    return useContext(UserContext)
}
export function UserProvider({user, children}) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}