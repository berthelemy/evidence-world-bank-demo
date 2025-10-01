---
title: Population Growth
sidebar_position: 2
queries:
  - population: population.sql
---

Click on the chart legend items to toggle visibility of each item.

```sql aggregate_by_year
select 
    year_date,
    sum(population) as total_population
from ${population}
group by year_date
order by year_date ASC
```

```sql population_growth_rate
WITH YearlyPopulations AS (
    -- Step 1: Aggregate the population for each year
    SELECT
        year_date,
        SUM(population) AS total_world_population
    FROM
        ${population}
    GROUP BY
        year_date
)
-- Step 2: Calculate the growth rate using the aggregated data
SELECT
    year_date,
    total_world_population,
    (
        (total_world_population - LAG(total_world_population, 1) OVER (ORDER BY year_date)) /
        LAG(total_world_population, 1) OVER (ORDER BY year_date)
    ) * 100 AS population_growth_rate
FROM
    YearlyPopulations
ORDER BY
    year_date;
```
## World population over time

<LineChart
  title="World Population Over Time"
  x=year_date
  y=population_growth_rate
  y2=total_world_population
  y2SeriesType=bar
  data={population_growth_rate}
  yAxisTitle="Population Growth Rate (%)"
  xAxisTitle="Year"
  yAxisFormat=","
  height=400
  />

  ```sql aggregate_by_region
    WITH YearlyPopulations AS (
    -- Step 1: Aggregate the population for each year
    SELECT
        year_date,
        region,
        SUM(population) AS total_region_population
    FROM
        ${population}
    GROUP BY
        region, year_date
)
-- Step 2: Calculate the growth rate using the aggregated data
SELECT
    year_date,
    region,
    total_region_population,
    (
        (total_region_population - LAG(total_region_population, 1) OVER (ORDER BY year_date)) /
        LAG(total_region_population, 1) OVER (ORDER BY year_date)
    ) * 100 AS population_growth_rate
FROM
    YearlyPopulations
ORDER BY
    year_date;
  ```
## World population by region over time

  <AreaChart
  title="Region Population Over Time"
  x=year_date
  series=region
  y=total_region_population
  data={aggregate_by_region}
  yAxisTitle="Population"
  xAxisTitle="Year"
  yAxisFormat=","
  height=400
  />
  
