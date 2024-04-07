import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import LineChartDatasetTransition from "./components/LineChartDatasetTransition";

import { mockDataBarChart } from "./utils/mockDataBarChart";
import { mockRevenueByCategoryData } from "./utils/mockRevenueByCategoryData";


function App() {
  return (
    <div className="dashboard">
        <div className="wrapper">
            <h1>
                <span className="thin">Dialing </span>
                <span className="bold">Insights</span> 2023-2024 
            </h1>
            <main className="main">
                <div className="grid">
                    <div className="card stat-card">
                        <h2>Total Revenue</h2>
                        <span className="stat">66,000</span>
                    </div>
                    <div className="card stat-card">
                        <h2>Total Conversion Rate</h2>
                        <span className="stat">5.6%</span>
                    </div>
                    <div className="card stat-card">
                        <h2>Total Sales</h2>
                        <span className="stat">2082</span>
                    </div>
                    <div className="card map-container">
                        <h2>Conversion Rate by First 10 months</h2>
                        <LineChartDatasetTransition
                            height={300}
                        />
                    </div>
                    <div className="card pie-chart-container">
                        <h2>Revenue by Category</h2>
                        <PieChart
                            height={450}
                            data={mockRevenueByCategoryData}
                        />
                    </div>
                    <div className="card bar-chart-container">
                        <h2>Date by sales (Per orders)</h2>
                        <BarChart
                            height={500}
                            data={mockDataBarChart}
                        />
                    </div>
                </div>
            </main>
        </div>
    </div>
);
}

export default App;