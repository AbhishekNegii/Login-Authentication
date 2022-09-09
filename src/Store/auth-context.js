import React, { useState } from "react"
const AuthContext=React.createContext({
    token:'',
    isLoggedin: false,
    login:(token)=>{},
    logout:()=>{},
})



export const AuthContextProvider=(props)=>{
    const[token,setToken]=useState(null)
    const userIsLoggedIn=!!token;

    const loginHandler=(token)=>{
        setToken(token)
    }
    const logutHandler=()=>{
        setToken(null)
    }
    
    const contextValue={
        token:token,
        isLoggedin: userIsLoggedIn,
        login:loginHandler,
        logout:logutHandler 
    }
    
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext