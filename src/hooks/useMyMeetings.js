import { useState, useMemo } from "react"
import { useAuthContext } from './useAuthContext'
import { useCollection } from './useCollection'

export const useMyMeetings = () => {
    const [meetings, setMeetings] = useState([])
    const { user } = useAuthContext();
    const { error: projectError, loading, documents: meetingDocuments } = useCollection('meetings')

    // useEffect(() => {
    //     if(meetingDocuments){
    //       const formattedMeetings = meetingDocuments.map((m) => {
    //         return {
    //           title: m.title,
    //           createdBy: m.createdBy,
    //           createdAt: m.createdAt.toDate(),
    //           start: m.start.toDate(),
    //           end: m.end.toDate(),
    //           description: m.description,
    //           guestsInvitedList: m.guestsInvitedList
    //         }
    //       })
    //       setMeetings(formattedMeetings)
    //     }
    // }, [meetingDocuments])


    // const myMeetings = meetings ? meetings.filter((meeting) =>
    //     meeting.guestsInvitedList.some(userObj => userObj.displayName === user.displayName)
    // ) : [];

    const myMeetings = useMemo(() => {
        if (meetingDocuments) {
          return meetingDocuments.filter((meeting) =>
            meeting.guestsInvitedList.some(userObj => userObj.displayName === user.displayName)
          ).map((m) => ({
            title: m.title,
            createdBy: m.createdBy,
            createdAt: m.createdAt.toDate(),
            start: m.start.toDate(),
            end: m.end.toDate(),
            description: m.description,
            guestsInvitedList: m.guestsInvitedList
          }));
        }
        return [];
      }, [meetingDocuments, user.displayName]);


    // const myMeetings = meetingDocuments ? meetingDocuments.filter((meeting) =>
    //     meeting.guestsInvitedList.some(userObj => userObj.displayName === user.displayName)
    // ) : [];

  return {
    myMeetings,
    loading,
    projectError
  };
};