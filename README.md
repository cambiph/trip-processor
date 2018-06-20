## Trip processor

### Purpose

All trips are archived to the Table Blob from Azure.
Since the column size is limited, the trip-json is spanned across multiple columns and can therefor not be imported in Postgres.
This script merges these columns to form a valid JSON.
All other columns are stripped, only the partitionKey is kept as this is the date of the trip.

### Usage

```javascript 
npm start -- --input=<path>
```

