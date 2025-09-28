select
      c.iso2Code as country_code,
      c.id as country_code3,
      c.name as country_name,
      c.region_value as region,
      c.incomeLevel_value as income_level,
      date as year,
      STRPTIME(date || '-01-01', '%Y-%m-%d') AS year_date,
      value as population
  from world_bank.populations
  join world_bank.countries as c
    on world_bank.populations.countryiso3code = c.id
  where c.id != ''
    AND c.region_value != 'Aggregates'
  order by country_code, year_date