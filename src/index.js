import { initializeApp } from "firebase/app";
import { getAnalytics, collection, getDocs,
    addDoc, deleteDoc, doc, query, where, 
    orderBy, serverTimestamp, getDoc, updateDoc,

 } from "firebase/firestore";
import { Collection } from 'mongodb';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC7dsGb3LnH9pfTRdkWMSiLJbj3HY9bF3A",
    authDomain: "uasbdd-31a20.firebaseapp.com",
    projectId: "uasbdd-31a20",
    storageBucket: "uasbdd-31a20.appspot.com",
    messagingSenderId: "1093164724783",
    appId: "1:1093164724783:web:b20717cfe4b0fb4fc88cda",
    measurementId: "G-VZMJ7G6KR2"
  };

  firebase.initializeApp(firebaseConfig)

  const db = getFirestore()
  const auth = getAuth()

  const colRef = Collection(db, 'kelompoksakitkepala')

  const q = query(colRef, where("npm", "==", "213510191"), orderBy('nama', 'desc'))
  
  //const q = query(colRef,  orderBy(createAt)) 

  const unsubCol = onSnapshot (q,(snapshot)=>{
    let kelompoksakitkepala = []
    snapshot.docs.forEach((doc) => {
        kelompoksakitkepala.push({ ...doc.data(), id: doc.id })
    })
    console.log(kelompoksakitkepala)
   })

  getDocs(colRef)
   .then((snapshot) => {
    let kelompoksakitkepala = []
    snapshot.docs.forEach((doc) => {
        kelompoksakitkepala.push({ ...doc.data(), id: doc.id })
    })
    console.log(kelompoksakitkepala)
   })
   .catch(err => {
    console.log(err.message)
   })

   const addkelompoksakitkepalaForm = document.querySelector('.add')
   addkelompoksakitkepalaForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    addDoc(colRef, {
        nama: addkelompoksakitkepalaForm.namespaceURI.value,
        npm: addkelompoksakitkepalaForm.npm.value,
        createdAt : serverTimestamp()
    })
    .then(()=> {
        addkelompoksakitkepalaForm.reset()
    })

   })

   const deletekelompoksakitkepalaForm = document.querySelector('.delete')
   deletekelompoksakitkepalaForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const docRef = doc(db, 'kelompoksakitkepala', deletekelompoksakitkepalaForm.id.value)

    deleteDoc(docRef)
     .then(() => {
        deletekelompoksakitkepalaForm.reset()
     })

   })

   const docRef = doc(db,'kelompoksakitkepala', 'AIzaSyC7dsGb3LnH9pfTRdkWMSiLJbj3HY9bF3A')

   getDoc(docRef)
    .then((doc)=> {
        console.log(doc.data(), doc.id)
    })

    const unsubDoc = onSnapshot(docRef,()=>{
        console.log(doc.data(), doc.id)
    })

    const updateForm = document.querySelector('.update')
    updateForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        const docRef = doc(db, 'kelompoksakitkepala', updateForm.id.value)

        updateDoc(docRef,{
            nama:'update nama'
        })
        .then(()=>{
            updateForm.reset()
        })

    })

    const signupForm = document.querySelector('.signup')
    signupForm.addEventListener('submit', (e)=>{
        e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err)=>{
            console.log(err.message)
        })
    })
    
    const logoutButton = document.querySelector('.logout')
    logoutButton.addEventListener('click', ()=>{
        signOut(auth)
        .then(()=>{
            console.log('the user signed out')
        })
        .catch((err)=>{
            console.log(err.message)
        })   
    })

    const loginForm = document.querySelector('.login')
    loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            console.log('user logged in:', cred.user)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    })
    
    const unsubAuth = onAuthStateChanged(auth, (user)=> {
        console.log('user status changed:', user)
    })

    const unsuButton = document.querySelector('.unsub')
    unsuButton.addEventListener('click', ()=>{
        console.log('unsubscribing')
        unsubCol()
        unsubDoc()
        unsubAuth()

    })   
        
   


