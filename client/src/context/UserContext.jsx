import { createContext, useContext } from "react";

const UserContext = createContext()

export const UserContextProvider = ({ children }) =>{

    async function loginUser(){
        try {
            
        } catch (err) {
            console.log(err);
        }
    }

    return <UserContext.Provider value={{
        user:"xyz"
    }}>{children}</UserContext.Provider>
}

export const UserData = ()=> useContext(UserContext)