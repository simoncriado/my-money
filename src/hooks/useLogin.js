import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

// We use this hook inside a component and then we use the login function. If in the meantime we unmount the component then the cleanup function will be fired and then isCancelled 
// is going to be updated to "true". Then if after that we get the response for the signInWithEmailAndPassword back and it tries to update the state it is not going to do it because isCancelled is now true.
export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // Sign the user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

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

    // Cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }
}