select
      c.iso2Code as country_code,
      c.id as country_code3,
      c.name as country_name,
      c.region_value as region,
      c.incomeLevel_value as income_level,
      e.date as year,
      STRPTIME(e.date || '-01-01', '%Y-%m-%d') AS year_date,
      CASE
      WHEN try_cast (e.value as decimal)/100 is not null
      THEN try_cast (e.value as decimal)/100
      ELSE 0
      END as access_to_electricity,
      try_cast (i.value as decimal) as internet_users
  from world_bank.countries as c
  join world_bank.electricity as e
    on e.countryiso3code = c.id
  join world_bank.internet as i 
    on i.countryiso3code = c.id AND i.date = e.date
  where c.id != ''
    AND c.region_value != 'Aggregates'
  order by country_code, year_date