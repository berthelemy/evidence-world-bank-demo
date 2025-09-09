---
title: Countries
---



```sql raw_data
  select
      countryiso3code as country_code,
      c.name as country_name,
      c.region_value as region,
      c.incomeLevel_value as income_level,
      date as year,
      STRPTIME(date || '-01-01', '%Y-%m-%d') AS year_date,
      value as population
  from world_bank.populations
  join world_bank.countries as c
    on world_bank.populations.countryiso3code = c.id
  where countryiso3code != ''
    AND c.region_value != 'Aggregates'
  order by country_code, year_date
  
```

```sql total_world_population
    select 
        sum(population) as total_population,
        year_date
    from ${raw_data}
    where year_date = (select max(year_date) from ${raw_data})
    group by year_date
```

## World Population at <Value data={total_world_population} value=year_date fmt="YYYY" />

<BigValue
  title="Total World Population"
  data={total_world_population}
  value=total_population
  fmt=num2b
  
/>

```sql aggregate_by_year
select 
    year_date,
    sum(population) as total_population
from ${raw_data}
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
        ${raw_data}
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
        ${raw_data}
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

  ## World popuplation by country income level over time

```sql aggregate_by_income_level
    WITH YearlyPopulations AS (
    -- Step 1: Aggregate the population for each year
    SELECT
        year_date,
        income_level,
        SUM(population) AS total_population
    FROM
        ${raw_data}
    GROUP BY
        income_level, year_date
)
-- Step 2: Calculate the growth rate using the aggregated data
SELECT
    year_date,
    income_level,
    total_population,
    (
        (total_population - LAG(total_population, 1) OVER (ORDER BY year_date)) /
        LAG(total_population, 1) OVER (ORDER BY year_date)
    ) * 100 AS population_growth_rate
FROM
    YearlyPopulations
ORDER BY
    year_date;
  ```

    <AreaChart
  title="Population Over Time By Income Level"
  x=year_date
  series=income_level
  y=total_population
  data={aggregate_by_income_level}
  yAxisTitle="Population"
  xAxisTitle="Year"
  yAxisFormat=","
  height=400
  />