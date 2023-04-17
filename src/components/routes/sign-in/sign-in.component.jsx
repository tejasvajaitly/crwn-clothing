import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../../utils/firebase.utils"

import SignUpForm from "../../sign-up-form/sign-up-form.component"

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef  = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Signin</h1>
            <button onClick={logGoogleUser}>
                Sign in with google pop up
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn