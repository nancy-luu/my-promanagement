export const statusHelper = (p) => {
    let status;
    if(!p.isCompleted && p.comments.length === 0) {
      status = "Open";
    } else if (p.comments.length > 0 && p.isCompleted === false) {
      status = "In Progress"
    } else if (p.isCompleted){
      status = "Complete"
    } else {
      status = "Unknown"
    }
    return status;
}