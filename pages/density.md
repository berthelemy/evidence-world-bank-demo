---
title: Population Density
sidebar_position: 3
queries:
  - population: population.sql
---

```sql current_population
    select 
        country_name,
        country_code,
        population
    from ${population}
    where year_date = (select max(year_date) from ${population})
```

```sql density
SELECT
    p.country_name,
    p.country_code,
    p.population,
    a.area,
    p.population / a.area as population_density
FROM restcountries.countries as a
JOIN ${current_population} as p on p.country_code = a.cca2
order by population_density desc
```

Small countries like Monaco and Singapore have very high population densities, while large countries with big land areas but relatively small populations like Australia and Canada have low population densities.

### Large countries

This map is provided by [Natural Earth](https://www.naturalearthdata.com/). It excludes tiny countries like Monaco and Singapore.

```sql density_large
SELECT * from ${density}
WHERE population_density < 1200
```

<AreaMap 
    data={density_large} 
    title="Population Density (per km2)"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=population_density
    valueFmt=num0k
    height=500
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'population', fmt: 'num2m', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
        {id: 'population_density', title: 'Population Density (/km2)', fmt: 'num0', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
    ]}
/>

### Tiny countries

This separate map shows just the tiny countries, which are excluded from the main map above.

<AreaMap 
    data={density} 
    title="Population Density (per km2) for tiny countries"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_tiny_countries.geojson'
    geoId=iso_a2
    value=population_density
    valueFmt=num0k
    height=500
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'population', fmt: 'num2m', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
        {id: 'population_density', title: 'Population Density (/km2)', fmt: 'num0', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
    ]}
/>

### Top 10 most densely populated countries

```sql top10_density
    select 
        country_name,
        population,
        area,
        population_density
    from ${density}
    order by population_density desc
    limit 10
```

<BarChart
  x=country_name
  y=population_density
  data={top10_density}
  yAxisTitle="Population Density (people / km2)"
  xAxisTitle="Country"
  yAxisFormat="num0"
  height=400
  />

### Bottom 10 least densely populated countries

```sql bottom10_density
    select 
        country_name,
        population,
        area,
        population_density
    from ${density}
    order by population_density asc
    limit 10
```

<BarChart
  x=country_name
  y=population_density
  data={bottom10_density}
  yAxisTitle="Population Density (people / km2)"
  xAxisTitle="Country"
  yAxisFormat="num0"
  height=400
    />