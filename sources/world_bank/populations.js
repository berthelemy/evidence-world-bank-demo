let url = 'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=20000';

const response = await fetch(url);
const json = await response.json();
const metadata = json[0];   // paging info, etc.
const data = json[1];       // actual array of population data

//console.log(data);
export { data };