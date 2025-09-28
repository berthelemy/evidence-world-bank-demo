let url = 'https://restcountries.com/v3.1/all?fields=name,cioc,area,cca2';

function flatten(obj, prefix = '', res = {}) {
  for (let key in obj) {
    const val = obj[key];
    const newKey = prefix ? `${prefix}_${key}` : key;

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      // Recursively flatten nested objects
      flatten(val, newKey, res);
    } else {
      res[newKey] = val;
    }
  }
  return res;
}

async function fetchAndFlattenCountries() {

  try {
    const response = await fetch(url);
    const json = await response.json();

    const countries = json;

    // Flatten each country
    const flatCountries = countries.map(country => flatten(country));

    //console.log(flatCountries);
    return flatCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

// Call the function
const data = await fetchAndFlattenCountries();

export { data };