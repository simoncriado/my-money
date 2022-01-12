import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // If we don´t use a ref --> infinite loop happens in useEffect
    // _query is an array and is "different" on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

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

    }, [collection, query, orderBy])

    return { documents, error }
}