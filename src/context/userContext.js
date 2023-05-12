import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({children})=>{
    return(
        <UserContext.Provider value="hello">
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;