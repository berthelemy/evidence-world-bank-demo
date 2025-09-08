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