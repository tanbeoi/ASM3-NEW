import React, { useEffect, useState } from 'react';
import '../App.css';

const DataVis = () => {
  // State to hold the image URLs
  const [images, setImages] = useState({
    boxPlot: '',
    barPlot: '',
    countPlot: '',
    barPlotDay: '',
    scatterPlotDelaysByAirline: '',
    linePlotDelaysOverYears: ''
  });

  // Function to fetch images from the backend
  const fetchImages = async () => {
    try {
      // Fetch each image from the backend
      const boxPlot = await fetch('http://localhost:8000/visualizations/box_plot').then(res => res.blob());
      const barPlot = await fetch('http://localhost:8000/visualizations/bar_plot').then(res => res.blob());
      const countPlot = await fetch('http://localhost:8000/visualizations/count_plot').then(res => res.blob());
      const barPlotDay = await fetch('http://localhost:8000/visualizations/bar_plot_day').then(res => res.blob());
      const scatterPlotDelaysByAirline = await fetch('http://localhost:8000/visualizations/scatter_plot_delays_by_airline').then(res => res.blob());
      const linePlotDelaysOverYears = await fetch('http://localhost:8000/visualizations/line_plot_delays_over_years').then(res => res.blob());

      // Update the state with the new image URLs
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

  // useEffect to fetch images on component mount and set up an interval to refresh them
  useEffect(() => {
    fetchImages(); // Initial fetch
    const interval = setInterval(fetchImages, 60000); // Fetch images every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Render the images
  return (
    <div className="data-vis-container">
      <h1>Data Visualizations</h1>
      <img src={images.boxPlot} alt="Box Plot" style={{ width: '600px', height: 'auto' }} />
      <img src={images.barPlot} alt="Bar Plot" style={{ width: '600px', height: 'auto' }} />
      <img src={images.countPlot} alt="Count Plot" style={{ width: '600px', height: 'auto' }} />
      <img src={images.barPlotDay} alt="Bar Plot by Day" style={{ width: '600px', height: 'auto' }} />
      <img src={images.scatterPlotDelaysByAirline} alt="Scatter Plot of Delays by Airline" style={{ width: '900px', height: 'auto' }} />
      <img src={images.linePlotDelaysOverYears} alt="Line Plot of Delays Over Years" style={{ width: '1200px', height: 'auto' }} />
    </div>
  );
};

export default DataVis;