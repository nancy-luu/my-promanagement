import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore, timestamp } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useHistory } from "react-router-dom"


export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const history = useHistory();


  const signup = async (email, password, displayName, thumbnail, department, role) => {
    setError(null)
    setIsPending(true)
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password error');
      setIsPending(false);
      return; // Return early if password requirements are not met
    }

    if(thumbnail === null){
      setError('Choose image')
      setIsPending(false);
      return;
    }
  
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
  
      if (!res.user) {
        throw new Error('Could not complete signup');
      }

      //upload user thumbnail--------------------------------
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}` // uid --> unique id of user
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()



      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        createdAt: timestamp.fromDate(new Date()),
        displayName,
        photoURL: imgUrl,
        department,
        role,
        bookmarkedProjects: []
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      history.push('/dashboard')

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