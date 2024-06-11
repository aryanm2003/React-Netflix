
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA7p93e39jgzoqOEk4ZXyl4oOAJxU45aUo",
  authDomain: "netflix-clone-64288.firebaseapp.com",
  projectId: "netflix-clone-64288",
  storageBucket: "netflix-clone-64288.appspot.com",
  messagingSenderId: "869677928074",
  appId: "1:869677928074:web:7ec823a27f9fe54f00e773"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db  = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
        const user =res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.log(error); 
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const logout = () => {
    signOut(auth);
}

export {auth,db,login,logout,signup};