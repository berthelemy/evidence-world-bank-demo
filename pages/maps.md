---
title: Comparison Maps
sidebar_position: 5
hide_toc: true
queries:
  - services: services.sql
  - population: population.sql
---

```sql current_country_data
select 
    p.country_name as country_name,
    p.country_code as country_code,
    p.region as region,
    p.income_level as income_level,
    p.year_date as year_date,
    s.access_to_electricity as access_to_electricity,
    case
        when s.internet_users is null then 0
        else s.internet_users
    end as internet_users,
    p.population as population
from ${services} as s
join ${population} as p on p.country_code = s.country_code and p.year_date = s.year_date
where s.year_date = (select max(year_date) from ${services}) 
order by s.country_name, s.year_date DESC
```

```sql regions
    select distinct region
    from ${current_country_data}
    order by region
```

Select a region for a more detailed view.

<ButtonGroup 
    data={regions} 
    name=region_picker 
    value=region
    defaultValue="%"
    >
    <ButtonGroupItem valueLabel="All regions" value="%" default />
</ButtonGroup>

```sql current_country_data_filtered
select 
    country_name,
    country_code,
    region,
    income_level,
    year_date,
    access_to_electricity,
    internet_users,
    population
from ${current_country_data}
where region like '${inputs.region_picker}'
```

```sql density
SELECT
    p.country_name,
    p.country_code,
    p.population,
    p.region,
    a.area,
    p.population / a.area as population_density
FROM restcountries.countries as a
JOIN ${current_country_data_filtered} as p on p.country_code = a.cca2
order by population_density desc
```

```sql density_large
SELECT * from ${density}
WHERE population_density < 1200
```

Data as at <Value data={current_country_data_filtered} column=year_date />.

<Grid cols=2>

<AreaMap 
    data={current_country_data_filtered} 
    title="Population"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=population
    valueFmt=num0k
    height=250
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'population', fmt: 'num2m', fieldClass: 'text-[grey]', valueClass: 'text-[green]'}
        
    ]}
/>

<AreaMap 
    data={current_country_data_filtered} 
    title="Access to electricity"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=access_to_electricity
    valueFmt=pct
    height=250
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'access_to_electricity', fmt: 'pct', fieldClass: 'text-[grey]', valueClass: 'text-[green]'}
        
    ]}
/>

<AreaMap 
    data={current_country_data_filtered} 
    title="Internet users per 100 people"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=internet_users
    valueFmt=num
    height=250
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'internet_users', fmt: 'num', fieldClass: 'text-[grey]', valueClass: 'text-[green]'}
        
    ]}
/>

<AreaMap 
    data={density_large} 
    title="Population Density (per km2)"
    areaCol=country_code
    geoJsonUrl='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
    geoId=iso_a2
    value=population_density
    valueFmt=num0k
    height=250
    tooltip={[
        {id: 'country_name', fmt: 'id', showColumnName: false, valueClass: 'text-xl font-semibold'},
        {id: 'country_code', fmt: 'id', showColumnName: false, valueClass: 'text-l font-semibold'},
        {id: 'population', fmt: 'num2m', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
        {id: 'population_density', title: 'Population Density (/km2)', fmt: 'num0', fieldClass: 'text-[grey]', valueClass: 'text-[green]'},
    ]}
/>

</Grid>

<LinkButton url='./'>
  Return to home page
</LinkButton>