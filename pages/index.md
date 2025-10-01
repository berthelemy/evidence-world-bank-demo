---
title: Home
sidebar_position: 1
queries:
  - population: population.sql
---

## About this site

This is a demonstration site, illustrating how to use [Evidence](https://evidence.dev) to build data portals. The data is sourced from the [World Bank Open Data](https://data.worldbank.org/) platform.

The charts connect together World Bank datasets on countries, population, access to electricity and internet users.

### Technical details

Evidence uses Javascript to pull data from the World Bank API using [sources](https://docs.evidence.dev/core-concepts/data-sources/) defined in the `sources` folder. The Javascript code also flattens the JSON data into a tabular format.

These tables are then transformed using [queries](https://docs.evidence.dev/core-concepts/queries/), using the DuckDB dialect of SQL.

Finally, the data is visualized using using Evidence's embedded visualization components on [pages](https://docs.evidence.dev/core-concepts/pages/) defined in the `pages` folder.

The site is hosted on Github Pages. All the code is available in this [Github repository](https://github.com/berthelemy/evidence-world-bank-demo).

### Contact

This site was created by [Mark Berthelemy](https://consulting.berthelemy.net). Mark is available for consulting engagements to help you build your own data portal using Evidence. Please get in touch if you would like to discuss.

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
    height=500
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