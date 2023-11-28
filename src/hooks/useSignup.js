import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail, department, role) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      //upload user thumbnail--------------------------------
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}` // uid --> unique id of user
        // where the user will be stored
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
        // uloaded the image and storing the response of the upload
      const imgUrl = await img.ref.getDownloadURL()
        // taking the ref and getting the downloadURL 
        // and storing into the imgUrl constant to use below


      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a use document
      // makes a reference to a user in the users document with the res uid
      // setting a new document for every user that signs up
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
        department,
        role
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}