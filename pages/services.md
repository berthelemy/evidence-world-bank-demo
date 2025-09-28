---
title: Access to services
sidebar_position: 4
queries:
  - services: services.sql
---

The raw data comes from the World Bank's [Access to electricity (% of population)](https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS) and [Internet users (per 100 people)](https://data.worldbank.org/indicator/IT.NET.USER.ZS) datasets.

They show, for each country and year, the percentage of the population with access to electricity and the number of internet users per 100 people.

## Summary

The chart below shows the average access to electricity and internet users as a percentage of each country's population over time.

There are some obvious discrepancies, probably due to missing data in the World Bank dataset.

```sql summary_by_year
select 
    year_date,
    avg(access_to_electricity) as access_to_electricity,
    avg(internet_users) as internet_users
from ${services} as s
where access_to_electricity is not null
and internet_users is not null
group by year_date
order by year_date
```


<LineChart
  title="Access to Electricity and Internet Users Over Time"
  x=year_date
  y=access_to_electricity
  y2=internet_users
  data={summary_by_year}
  yAxisTitle="Access to Electricity (%)"
  y2AxisTitle="Internet Users (%)"
  xAxisTitle="Year"
  yAxisFormat="0.0%"
  y2AxisFormat="0.0%"
  height=400
  />

  ## By Region

```sql summary_by_year_region
select 
    year_date,
    region,
    avg(access_to_electricity) as access_to_electricity,
    avg(internet_users) as internet_users
from ${services} as s
where access_to_electricity is not null
and internet_users is not null
group by year_date, region
order by year_date, region
```
<LineChart
    title="Access to Electricity Over Time by Region"
    x=year_date
    y=access_to_electricity
    series=region
    data={summary_by_year_region}
    yAxisTitle="Access to Electricity (%)"
    xAxisTitle="Year"
    yAxisFormat="0.0%"
    height=600
    />

<LineChart
    title="Internet Users Over Time by Region"
    x=year_date
    y=internet_users
    series=region
    data={summary_by_year_region}
    yAxisTitle="Internet Users (%)"
    xAxisTitle="Year"
    yAxisFormat="0.0%"
    height=600
    />

