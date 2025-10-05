import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if(storedUser){
            setUser(storedUser);
        }
        
    }, []);

    const login = (username) => {
            const fakeUser = {...username};

            setUser(fakeUser);

            localStorage.setItem("user", JSON.stringify(fakeUser));
        };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth(){
    return useContext(AuthContext);
}