import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../../utils/firebase.utils"

import SignUpForm from "../../sign-up-form/sign-up-form.component"
import SignInForm from "../../sign-in-form/sign-in-form.component"

import "./authentication.styles.scss"

const Authentication = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef  = await createUserDocumentFromAuth(user)
    }
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication