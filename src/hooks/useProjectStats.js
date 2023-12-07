export const useProjectStats = (projects) => {
        
    const openProjects = projects ? projects.filter(project => {return project.isCompleted === false && project.comments.length === 0}) : []
    
    const inProgressProjects = projects ? projects.filter(project => project.comments && project.comments.length > 0) : []
    const completedProject = projects ? projects.filter(project => project.isCompleted) : []
    const projectCount = projects ? projects.length : []


    let openPercent = (openProjects.length / projectCount) * 100;
    let inProgressPercent = (inProgressProjects.length / projectCount) * 100;
    let completedPercent = (completedProject.length / projectCount) * 100;
        
    return {
        projects,
        openProjects, 
        inProgressProjects, 
        completedProject, 
        projectCount, 
        openPercent,
        inProgressPercent,
        completedPercent
    };
};