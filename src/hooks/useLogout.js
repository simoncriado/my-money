import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

// We use this hook inside a component and then we use the logout function. If in the meantime we unmount the component then the cleanup function will be fired and then isCancelled 
// is going to be updated to "true". Then if after that we get the response for the signOut back and it tries to update the state it is not going to do it because isCancelled is now true.
export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // Sign the user out
        try {
            await projectAuth.signOut()

            // Dispatch logout action
            dispatch({ type: 'LOGOUT' })

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

    return { logout, error, isPending }

}