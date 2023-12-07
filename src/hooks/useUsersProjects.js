import { useCollection } from './useCollection'

export const useUsersProjects = ( user ) => {
    const { error: projectError, loading, documents: projectDocuments } = useCollection('projects');

    
    const myProjects = user && projectDocuments ? projectDocuments.filter(projectDoc =>
        projectDoc.assignedUsersList.some(userObj => userObj.displayName === user.displayName)
        ) 
        : 
        []
    ;
        
    const openProjects = myProjects.filter(project => {return project.isCompleted === false && project.comments.length === 0});
    
    const inProgressProjects = myProjects.filter(project => project.comments && project.comments.length > 0);
    const completedProjects = myProjects.filter(project => project.isCompleted)
    const projectCount = myProjects.length;


    let openPercent = (openProjects.length / projectCount) * 100;
    let inProgressPercent = (inProgressProjects.length / projectCount) * 100;
    let completedPercent = (completedProjects.length / projectCount) * 100;
        
    return {
        myProjects, 
        openProjects, 
        inProgressProjects, 
        completedProjects, 
        projectCount, 
        openPercent,
        inProgressPercent,
        completedPercent,
        loading, 
        projectError 
    };
};