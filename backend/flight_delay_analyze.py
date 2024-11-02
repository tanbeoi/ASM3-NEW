import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set the non-interactive backend for Matplotlib
plt.switch_backend('Agg')

def generate_flight_delay_visualizations():
    # Construct the absolute path to the CSV file
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Go up one level to the base directory
    csv_path = os.path.join(base_dir, 'backend', 'BITRE_MERGED_FLIGHT_DELAY.csv')

    # Load the provided CSV file to inspect the structure and content
    flight_data = pd.read_csv(csv_path)

    # Ensure the directory exists
    output_dir = os.path.join(base_dir, 'cos30049', 'public', 'visualizations')
    os.makedirs(output_dir, exist_ok=True)

    # Scatter plot of Departures Delayed and Arrivals Delayed by Airline
    plt.figure(figsize=(15, 30))
    sns.scatterplot(x='Airline', y='Departures Delayed', data=flight_data, color='green', label='Departures Delayed')
    sns.scatterplot(x='Airline', y='Arrivals Delayed', data=flight_data, color='red', label='Arrivals Delayed')
    plt.xticks(rotation=45, ha='right')
    plt.title('Scatter Plot of Flight Delays by Airline')
    plt.ylabel('Frequency of Delays')
    plt.xlabel('Airline')
    plt.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'scatter_plot_delays_by_airline.png'))  # Save the plot as an image
    print("scatter_plot_delays_by_airline.png saved successfully")  # Logging
    plt.close()

    # Line plot of Flight Delays Over the Years
    delays_over_years = flight_data.groupby('Year')[['Departures Delayed', 'Arrivals Delayed']].sum().reset_index()
    plt.figure(figsize=(30, 15))
    plt.plot(delays_over_years['Year'], delays_over_years['Departures Delayed'], marker='o', color='blue', label='Departures Delayed')
    plt.plot(delays_over_years['Year'], delays_over_years['Arrivals Delayed'], marker='o', color='green', label='Arrivals Delayed')
    plt.xlabel('Year')
    plt.ylabel('Number of Delays')
    plt.title('Flight Delays Over the Years')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'line_plot_delays_over_years.png'))  # Save the plot as an image
    print("line_plot_delays_over_years.png saved successfully")  # Logging
    plt.close()

if __name__ == "__main__":
    generate_flight_delay_visualizations()