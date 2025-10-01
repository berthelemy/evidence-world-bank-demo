---
title: Home
sidebar_position: 1

---


This is a demonstration site, illustrating how to use the [Evidence](https://evidence.dev) visualisation platform to build data portals.

The data is sourced from the [World Bank Open Data](https://data.worldbank.org/) platform.

The charts connect together World Bank datasets on countries, population, access to electricity and internet users.

## Technical details

Evidence uses Javascript to pull data from the World Bank API using [sources](https://docs.evidence.dev/core-concepts/data-sources/) defined in the `sources` folder. The Javascript code also flattens the JSON data into a tabular format.

These tables are then transformed using [queries](https://docs.evidence.dev/core-concepts/queries/), using the [DuckDB](http://duckdb.org/docs/) dialect of SQL.

Finally, the data is visualized using using Evidence's embedded visualization components on [pages](https://docs.evidence.dev/core-concepts/pages/) defined in the `pages` folder.

The site is hosted on Github Pages. All the code is available in this [Github repository](https://github.com/berthelemy/evidence-world-bank-demo).

## Contact

This site was created by [Mark Berthelemy](https://consulting.berthelemy.net). Mark is available for consulting engagements to help you build your own data portal using Evidence. Please get in touch if you would like to discuss.