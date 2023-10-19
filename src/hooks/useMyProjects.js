import { useAuthContext } from './useAuthContext'
import { useCollection } from './useCollection'

export const useMyProjects = () => {
    const { user } = useAuthContext();
    const { error: projectError, loading, documents: projectDocuments } = useCollection('projects');

    
    const myProjects = projectDocuments ? projectDocuments.filter(projectDoc =>
        projectDoc.assignedUsersList.some(userObj => userObj.displayName === user.displayName)
        ) 
        : 
        []
    ;
        
    const openProjects = myProjects.filter(project => {return project.isCompleted === false && project.comments.length === 0});
    
    const inProgressProjects = myProjects.filter(project => project.comments && project.comments.length > 0);
    
    const completedProject = myProjects.filter(project => project.isCompleted)
    
    const projectCount = myProjects.length;
        
    return {
        myProjects, 
        openProjects, 
        inProgressProjects, 
        completedProject, 
        projectCount, 
        loading, 
        projectError 
    };
};
