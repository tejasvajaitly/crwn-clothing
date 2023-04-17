import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAM7sh8vPar359z4iZfd-fQ6ZLOIfgl6GI",
    authDomain: "crwn-clothing-firebase-7235a.firebaseapp.com",
    projectId: "crwn-clothing-firebase-7235a",
    storageBucket: "crwn-clothing-firebase-7235a.appspot.com",
    messagingSenderId: "337775006732",
    appId: "1:337775006732:web:61b71e6043a4aaf3edca29"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
  }