import { useAuthContext } from './useAuthContext'
import { useCollection } from './useCollection'

export const useMyProjects = () => {
    const { user } = useAuthContext();
    const { error: projectError, loading, documents: projectDocuments } = useCollection('projects');

    const myProjects = projectDocuments
        ? projectDocuments.filter(projectDoc =>
            projectDoc.assignedUsersList.some(userObj => userObj.displayName === user.displayName)
          )
        : [];

    return { myProjects, loading, projectError };
};
