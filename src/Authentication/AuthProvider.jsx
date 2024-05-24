import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
//  import auth from "../../Firebase/Firebase.config";
import toast from "react-hot-toast";
import auth from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext=createContext(null);
const googleProvider= new GoogleAuthProvider()
const githubProvider=new GithubAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    
    const [loading,setLoading]=useState(true);
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updatedUser=(userName,photoURL)=>{
        
        return updateProfile(auth.currentUser,{
            displayName:userName,
            photoURL:photoURL
    
        })
        .then(()=>{
            console.log('Updated user');
        })
        .catch(error=>{
             console.error(error);
         })
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        setUser(null);
        return signInWithPopup(auth,googleProvider)
    }
    const signInWithGithub=()=>{
        setLoading(true);
        setUser(null);
        return signInWithPopup(auth,githubProvider)
    }
    const logOut =async()=>{
        setLoading(true);
        console.log("Iam logged out");
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/logout`,{withCredentials:true})
        console.log(data);
        return signOut(auth)
        .then(()=>{
            setUser(null);
            console.log("deleted coocie");
            toast.success('Successfully Logged Out');
        })
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
            if(currentUser){
                const loggedUser={email:currentUser.email}
                axios
                .post('https://blognest-server.vercel.app/jwt',loggedUser,
                   { withCredentials:true}
                )
                .then(res=>{
                    console.log(res.data);
                })
            }
            console.log("observing",currentUser);
        });
        return ()=>{
            unSubscribe();
        }
    },[])
    const authInfo={user,createUser,signInUser,logOut,loading,signInWithGoogle,signInWithGithub,setUser,updatedUser}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider >
    );
};

export default AuthProvider;
AuthProvider.propTypes={
    children: PropTypes.node

}