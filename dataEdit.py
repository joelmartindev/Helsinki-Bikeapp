# Run this script for each file to remove useless data

# Read the CSV file
import pandas as pd

df = pd.read_csv(
    "path/to/file", sep=","
)

# Drop duplicate data
df.drop_duplicates(subset=None, inplace=True)

# Filter out rows with the wrong value or stations that can't be found in the list of stations
df = df[df["Covered distance (m)"] >= 10]
df = df[df["Duration (sec.)"] >= 10]
df = df[df["Duration (sec.)"] < 86400]
df = df[df["Departure station id"] != 997]
df = df[df["Return station id"] != 997]
df = df[df["Departure station id"] != 754]
df = df[df["Return station id"] != 754]
df = df[df["Departure station id"] != 999]
filtered_df = df[df["Return station id"] != 999]

# Convert the "Covered distance (m)" column to string data type
filtered_df["Covered distance (m)"] = (
    filtered_df["Covered distance (m)"]
    .astype(str)
    .apply(lambda x: x.rstrip("0").rstrip("."))
)

# Sort based on timestamp
sorted_df = filtered_df.sort_values(by='Departure')

# Write the filtered and sorted data to a new file
sorted_df.to_csv(
    "path/to/new_file", index=False
)
