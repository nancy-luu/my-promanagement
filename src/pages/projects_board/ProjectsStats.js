import { useProjectStats } from '../../hooks/useProjectStats';
import ChartComponent from './ChartComponent';


const ProjectsStats = ({ currFilter, setCurrFilter, changeFilter, projects, error, documents }) => {
    const { openPercent, inProgressPercent, completedPercent } = useProjectStats(projects);

    const data = [
        { value: openPercent },
        { value: inProgressPercent },
        { value: completedPercent }
    ];

    const formattedOpenPercent = openPercent.toFixed(0);
    const formattedInProgressPercent = inProgressPercent.toFixed(0);
    const formattedCompletedPercent = completedPercent.toFixed(0);

  return (
    <div className="status-container">
        <h3 className="status-title">Status</h3>
        <div className="status-form">
          <div className="percent-container">
              <h4>Completed:</h4>
              <div className="bullet-container">
                <div className="complete-pt"></div>
                <p>{formattedCompletedPercent}%</p>
              </div>
              <h4>In Progress:</h4>
              <div className="bullet-container">
                <div className="progress-pt"></div>
                <p>{formattedInProgressPercent}%</p>
              </div>
              <h4>Open:</h4>
              <div className="bullet-container">
                <div className="open-pt"></div>
                <p>{formattedOpenPercent}%</p>
              </div>
          </div>
          <div className="chart-container">
            <ChartComponent data={data} />
          </div>
        </div>
    </div>
  )
}

export default ProjectsStats