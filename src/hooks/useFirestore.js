import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    case "UPDATED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true,  error: null }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  
  // add a project document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

    // update a document's comments
    const updateDocumentSummary = async (id, updates) => {
      dispatch({ type: "IS_PENDING" })
  
      try {
        const updatedDocumentSummary = await ref.doc(id).update(updates)
        dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocumentSummary })
        return updatedDocumentSummary
      } 
      catch (error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: error })
        return null
      }
    }

  // update a document's comments
  const updateDocumentComments = async (id, updates) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
      return updatedDocument
    } 
    catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error })
      return null
    }
  }

  // update complete status
  const markAsCompleted = async (id) => {
    dispatch({ type: "IS_PENDING" })


    try {
      const completedDocument = await ref.doc(id).update({ isCompleted: true })
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: completedDocument})
      return completedDocument
    }
    catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error})
      return null
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  // add meeting 
  const addMeetingDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedMeeting = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedMeeting })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // update user's acceptance response in meeting
  const acceptMeeting = async (docId, userId) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const meetingRef = ref.doc(docId)
      const meetingDoc = await meetingRef.get()

      if(!meetingDoc.exists){
        dispatchIfNotCancelled({ type: "ERROR", payload: "Document does not exist." })
        return null;
      }

      const meetingData = meetingDoc.data()
      const updatedGuestsList = meetingData.guestsInvitedList.map((guest) => {
        if(guest.id === userId){
          return {...guest, accepted:true}
        }
        return guest;
      })

      await meetingRef.update({ guestsInvitedList: updatedGuestsList})

      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedGuestsList})
      return updatedGuestsList

    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error})
      return null
    }
  }

  // remove user from meeting
  const removeUserFromMeeting = async (docId, userId) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const meetingRef = ref.doc(docId)
      const meetingDoc = await meetingRef.get()

      if (!meetingDoc.exists) {
        dispatchIfNotCancelled({ type: "ERROR", payload: "Document does not exist." });
        return null;
      }

      const meetingData = meetingDoc.data();
      const updatedGuestsList = meetingData.guestsInvitedList.filter(g => g.id !== userId);

      await meetingRef.update({ guestsInvitedList: updatedGuestsList });

      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedGuestsList})
      return updatedGuestsList

    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error})
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { 
    addDocument, 
    updateDocumentComments, 
    updateDocumentSummary, 
    markAsCompleted, 
    deleteDocument, 
    addMeetingDocument, 
    acceptMeeting,
    removeUserFromMeeting,
    response 
  }

}