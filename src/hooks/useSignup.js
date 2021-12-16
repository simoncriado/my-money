import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    // We create this async function cause we use await inside it. We take in 3 arguments which are coming from the signup form
    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        // We try to sign up a user and catch any errors if there are any.
        try {
            // Signup user with a firebase auth method which uses 2 arguments (email and password)
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            // If there is an error with the auth we will throw an error and catch it further down in the function
            if (!res) {
                throw new Error('Could not complete signup')
            }

            // As soon as we have a valid response we add a display name to the user
            await res.user.updateProfile({ displayName })

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            // Update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}