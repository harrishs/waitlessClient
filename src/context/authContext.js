import React, {useState} from "react";

export const AuthContext = React.createContext();

export const AuthProvider = props => {
    const [auth, setAuth] = useState({
        userId: null,
        token: null,
        isAuth: false
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}