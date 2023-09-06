import {useEffect, useState} from 'react';
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id);

        // represents the documents of the documents with all the data and id
        const unsubscribe = ref.onSnapshot((snapshot) => {
            if(snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            } else {
                setError('Document does not exist.')
            }

        }, (err) => {
            console.log(err.message)
            setError('Document not found')
        })

        // clean up function
        return () => unsubscribe();

    }, [collection, id])

    return { document, error }
}

