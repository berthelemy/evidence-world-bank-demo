---
title: Global population
sidebar_position: 1
queries:
  - population: population.sql
---

```sql total_world_population
    select 
        sum(population) as total_population,
        year_date
    from ${population}
    where year_date = (select max(year_date) from ${population})
    group by year_date
```

## World Population at <Value data={total_world_population} value=year_date fmt="YYYY" />

<BigValue
  title="Total World Population"
  data={total_world_population}
  value=total_population
  fmt=num2b
  
/>

## Population map for <Value data={total_world_population} value=year_date fmt="YYYY" />

```sql all_countries_latest
    select 
        country_name,
        country_code,
        population
    from ${population}
    where year_date = (select max(year_date) from ${population})
```

<AreaMap 
    data={all_countries_latest} 
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=population
    valueFmt=num0
    height=400
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'population', fmt: 'num0', fieldClass: 'text-[grey]', valueClass: 'text-[green]'}
    ]}
/>

## Top 10 most populous countries in <Value data={total_world_population} value=year_date fmt="YYYY" />

```sql top10
    select 
        country_name,
        population
    from ${population}
    where year_date = (select max(year_date) from ${population})
    order by population desc
    limit 10
```

<BarChart
  title="Top 10 Most Populous Countries"
  x=country_name
  y=population
  data={top10}
  sortBy=y
  sortOrder=desc
  limit=10
  xAxisTitle="Country"
  yAxisTitle="Population"
  yAxisFormat=","
  height=400
  />

## Top 10 least populous countries in <Value data={total_world_population} value=year_date fmt="YYYY" />

```sql bottom10
    select 
        country_name,
        population
    from ${population}
    where year_date = (select max(year_date) from ${population})
    order by population asc
    limit 10
```

<BarChart
  title="Top 10 Most Populous Countries"
  x=country_name
  y=population
  data={bottom10}
  sortBy=y
  sortOrder=desc
  limit=10
  xAxisTitle="Country"
  yAxisTitle="Population"
  yAxisFormat=","
  height=400
  />

  <LinkButton url='growth'>
  Next page: Population growth
</LinkButton>