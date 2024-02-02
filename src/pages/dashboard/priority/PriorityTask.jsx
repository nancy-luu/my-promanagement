
const PriorityTask = ({ project }) => {
  const currDate = new Date();
  const dueDate = new Date(project.dueDate.toDate());

  if (isNaN(dueDate)) {
    // Handle invalid dueDate, e.g., by setting it to a default date
    // or returning early to avoid errors
    return null;
  }

  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  const formattedCurrDate = dueDate.toLocaleDateString(undefined, options);

  return (
    <div className="task-form inner-common">
      <div>{project.name}</div>
      <div className={currDate.getTime() > dueDate.getTime() ? "pastDue" : "inProgress"}>
        <div>{formattedCurrDate}</div>
      </div>
    </div>
  );
};

export default PriorityTask;
