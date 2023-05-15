import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext= createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider=new GoogleAuthProvider();

    console.log({user,loading});
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleSignIN=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            console.log('current user', currentUser);
            setLoading(false);
            if(currentUser && currentUser.email){
                const loggedUser={
                    email: currentUser.email
                }
                fetch('https://car-doctor-server-chi-steel.vercel.app/jwt',{
                    method: 'POST',
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('jwt response',data);
                    // warning: local storage is not the best place for store access token(it is second best)
                    localStorage.setItem('car-access-token',data.token);
                    
                })
            }
            else{
                localStorage.removeItem('car-access-token');
            }
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        googleSignIN,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;