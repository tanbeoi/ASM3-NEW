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

    # Count plot of Rainfall amount by Location
    plt.figure(figsize=(12, 8))
    sns.countplot(x='Location', data=rain_data)
    plt.title('Count Plot of Rainfall Amount by Location')
    plt.xlabel('Location')
    plt.ylabel('Count')
    plt.xticks(rotation=90)
    plt.savefig(os.path.join(output_dir, 'count_plot.png'))  # Save the plot as an image
    print("count_plot.png saved successfully")  # Logging
    plt.close()

    # Scatter plot of Rainfall amount by Location
    plt.figure(figsize=(12, 8))
    sns.scatterplot(x='Location', y='Rainfall amount (millimetres)', data=rain_data)
    plt.title('Scatter Plot of Rainfall Amount by Location')
    plt.xlabel('Location')
    plt.ylabel('Rainfall amount (millimetres)')
    plt.xticks(rotation=90)
    plt.savefig(os.path.join(output_dir, 'scatter_plot.png'))  # Save the plot as an image
    print("scatter_plot.png saved successfully")  # Logging
    plt.close()

    # Line plot of Rainfall amount by Location
    plt.figure(figsize=(12, 8))
    sns.lineplot(x='Location', y='Rainfall amount (millimetres)', data=rain_data)
    plt.title('Line Plot of Rainfall Amount by Location')
    plt.xlabel('Location')
    plt.ylabel('Rainfall amount (millimetres)')
    plt.xticks(rotation=90)
    plt.savefig(os.path.join(output_dir, 'line_plot.png'))  # Save the plot as an image
    print("line_plot.png saved successfully")  # Logging
    plt.close()