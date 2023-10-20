import { useProjectStats } from '../../hooks/useProjectStats';
import ChartComponent from './ChartComponent';


const ProjectsStats = ({ currFilter, setCurrFilter, changeFilter, projects, error, documents }) => {
    const { openPercent, inProgressPercent, completedPercent } = useProjectStats(projects);

    // console.log('project stats:-----')
    // console.log(openPercent, inProgressPercent, completedPercent);

    const data = [
        { value: openPercent },
        { value: inProgressPercent },
        { value: completedPercent }
        // { value: 60 },
        // { value: 20 },
        // { value: 20 }
    ];

  return (
    <div className="status-container">
        <h3 className="status-title">Status of {currFilter} projects</h3>
        <div className="status-form">
          <div className="percent-container">
              <h4>Completed:</h4>
              <div className="bullet-container">
                <div className="complete-pt"></div>
                <p>{completedPercent}%</p>
              </div>
              <h4>In Progress:</h4>
              <div className="bullet-container">
                <div className="progress-pt"></div>
                <p>{inProgressPercent}%</p>
              </div>
              <h4>Open:</h4>
              <div className="bullet-container">
                <div className="open-pt"></div>
                <p>{openPercent}%</p>
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