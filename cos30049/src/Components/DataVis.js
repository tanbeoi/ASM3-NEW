import React, { useEffect, useState } from 'react';
import '../App.css';

const DataVis = () => {
  const [images, setImages] = useState({
    boxPlot: '',
    barPlot: '',
    countPlot: '',
    barPlotDay: '',
    scatterPlotDelaysByAirline: '',
    linePlotDelaysOverYears: ''
  });

  const fetchImages = async () => {
    try {
      const boxPlot = await fetch('http://localhost:8000/visualizations/box_plot').then(res => res.blob());
      const barPlot = await fetch('http://localhost:8000/visualizations/bar_plot').then(res => res.blob());
      const countPlot = await fetch('http://localhost:8000/visualizations/count_plot').then(res => res.blob());
      const barPlotDay = await fetch('http://localhost:8000/visualizations/bar_plot_day').then(res => res.blob());
      const scatterPlotDelaysByAirline = await fetch('http://localhost:8000/visualizations/scatter_plot_delays_by_airline').then(res => res.blob());
      const linePlotDelaysOverYears = await fetch('http://localhost:8000/visualizations/line_plot_delays_over_years').then(res => res.blob());

      setImages({
        boxPlot: URL.createObjectURL(boxPlot),
        barPlot: URL.createObjectURL(barPlot),
        countPlot: URL.createObjectURL(countPlot),
        barPlotDay: URL.createObjectURL(barPlotDay),
        scatterPlotDelaysByAirline: URL.createObjectURL(scatterPlotDelaysByAirline),
        linePlotDelaysOverYears: URL.createObjectURL(linePlotDelaysOverYears)
      });
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 60000); // Fetch images every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="data-vis-container">
      <h2>Flight Delay Visualizations</h2>
      <div className="chart-container">
        <img src={images.scatterPlotDelaysByAirline} alt="Scatter Plot Delays by Airline" />
      </div>
      <div className="chart-container">
        <img src={images.linePlotDelaysOverYears} alt="Line Plot Delays Over Years" />
      </div>
      <h2>Rain Data Visualizations</h2>
      <div className="chart-container">
        <img src={images.boxPlot} alt="Box Plot" />
      </div>
      <div className="chart-container">
        <img src={images.barPlot} alt="Bar Plot" />
      </div>
      <div className="chart-container">
        <img src={images.countPlot} alt="Count Plot" />
      </div>
      <div className="chart-container">
        <img src={images.barPlotDay} alt="Bar Plot by Day" />
      </div>
    </div>
  );
};

export default DataVis;