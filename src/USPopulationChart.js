import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the chart.js auto configuration

const USPopulationChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                const length = data.data.length;

                const labels = [];
                const values = [];
                for (let i = 0; i < length; i++) {
                    labels.push(data.data[i].Year);
                    values.push(data.data[i].Population);
                }

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Population (millions)',
                        backgroundColor: [
                            "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9",
                            "#c45850", "#CD5C5C", "#40E0D0"
                        ],
                        data: values
                    }]
                });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>U.S Population</h2>
            <Bar
                data={chartData}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'U.S population'
                    }
                }}
            />
        </div>
    );
};

export default USPopulationChart;
