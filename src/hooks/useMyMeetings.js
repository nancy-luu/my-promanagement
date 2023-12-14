import { useMemo } from "react"
import { useAuthContext } from './useAuthContext'
import { useCollection } from './useCollection'
import dayjs from "dayjs";


export const useMyMeetings = () => {
    const { user } = useAuthContext();
    const { error: projectError, loading, documents: meetingDocuments } = useCollection('meetings');
    const currentDate = dayjs();


    const myMeetings = useMemo(() => {
        if (meetingDocuments) {
          return meetingDocuments.filter((meeting) =>
            meeting.guestsInvitedList.some(userObj => userObj.displayName === user.displayName)
          ).map((m) => ({
            id: m.id,
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

    const todaysMeetings = myMeetings.filter(meeting => meeting.start === currentDate.toDate())

  return {
    myMeetings,
    todaysMeetings,
    loading,
    projectError
  };
};