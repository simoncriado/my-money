import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        // Real time listener to the collection. This fires once initially and everytime there is a change to the collection (like adding a new element)
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // Update states
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // Unsubscribe on unmount
        return () => unsubscribe()

    }, [collection])

    return { documents, error }
}