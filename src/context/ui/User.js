import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "../../services/firebase/db";


const UserContext = createContext();


export default function UserProvider({children}) {


    const[session, setSession] = useState({
        user: null, 
    });


    useEffect(() => {
        const unsubFromFbStateChange = 
        auth.onAuthStateChanged(user =>{
            setSession({user});
        });
        return () => unsubFromFbStateChange();
    });

    return(
        <UserContext.Provider value={session}>{children}</UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);