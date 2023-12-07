import { useUsersProjects } from "../../hooks/useUsersProjects";

// styles
import './HorizontalBarChart.css'; 

const HorizontalBarChart = ({ user }) => {

    const { projectCount, openPercent, inProgressPercent, completedPercent, openProjects, inProgressProjects,  completedProjects} =
    useUsersProjects(user);

    const barChartData = [
        { label: 'Open', percentage: openPercent, color: '#FFEE53' },
        { label: 'In Progress', percentage: inProgressPercent, color: '#FF6525' },
        { label: 'Completed', percentage: completedPercent, color: '#7521FF' },
    ];

    const existingData = barChartData.filter(segment => segment.percentage > 0);


  return (
    <div className="horizontal-bar-chart">
      {existingData.map((segment, index) => (
        <div
          key={index}
          className="bar-segment"
          style={{
            width: `${segment.percentage}%`,
            backgroundColor: segment.color,
          }}
        ></div>
      ))}
    </div>
  );
};

export default HorizontalBarChart;