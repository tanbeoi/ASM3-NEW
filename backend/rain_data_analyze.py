import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set the non-interactive backend for Matplotlib
plt.switch_backend('Agg')

def generate_rain_visualizations():
    # Construct the absolute path to the CSV file
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Go up one level to the base directory
    csv_path = os.path.join(base_dir, 'backend', 'RainData.csv')

    # Load the provided CSV file to inspect the structure and content
    rain_data = pd.read_csv(csv_path)

    # Ensure the directory exists
    output_dir = os.path.join(base_dir, 'cos30049', 'public', 'visualizations')
    os.makedirs(output_dir, exist_ok=True)

    # Box plot of Rainfall amount by Location
    plt.figure(figsize=(12, 8))
    sns.boxplot(x='Location', y='Rainfall amount (millimetres)', data=rain_data)
    plt.title('Box Plot of Rainfall Amount by Location')
    plt.xlabel('Location')
    plt.ylabel('Rainfall amount (millimetres)')
    plt.xticks(rotation=90)
    plt.savefig(os.path.join(output_dir, 'box_plot.png'))  # Save the plot as an image
    print("box_plot.png saved successfully")  # Logging
    plt.close()

    # Bar plot Rainfall amount by Location
    plt.figure(figsize=(12, 8))
    avg_rainfall_by_location = rain_data.groupby('Location')['Rainfall amount (millimetres)'].mean().reset_index()
    sns.barplot(x='Location', y='Rainfall amount (millimetres)', data=avg_rainfall_by_location)
    plt.title('Average Rainfall Amount by Location')
    plt.xlabel('Location')
    plt.ylabel('Average Rainfall amount (millimetres)')
    plt.xticks(rotation=90)
    plt.savefig(os.path.join(output_dir, 'bar_plot.png'))  # Save the plot as an image
    print("bar_plot.png saved successfully")  # Logging
    plt.close()

    # Count plot of Severity levels
    plt.figure(figsize=(10, 6))
    sns.countplot(x='Severity', data=rain_data, order=['No rain', 'Small', 'Moderate', 'High', 'Critical', 'Catastrophic'])
    plt.title('Count of Severity Levels')
    plt.xlabel('Severity')
    plt.ylabel('Count')
    plt.savefig(os.path.join(output_dir, 'count_plot.png'))  # Save the plot as an image
    print("count_plot.png saved successfully")  # Logging
    plt.close()

    # Bar plot of Average Rainfall amount by Day of the Week
    plt.figure(figsize=(12, 8))
    avg_rainfall_by_day = rain_data.groupby('Day of the week')['Rainfall amount (millimetres)'].mean().reset_index()
    sns.barplot(x='Day of the week', y='Rainfall amount (millimetres)', data=avg_rainfall_by_day, order=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    plt.title('Average Rainfall Amount by Day of the Week')
    plt.xlabel('Day of the Week')
    plt.ylabel('Average Rainfall amount (millimetres)')
    plt.savefig(os.path.join(output_dir, 'bar_plot_day.png'))  # Save the plot as an image
    print("bar_plot_day.png saved successfully")  # Logging
    plt.close()

if __name__ == "__main__":
    generate_rain_visualizations()