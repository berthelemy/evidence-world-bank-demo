let url = 'https://api.worldbank.org/v2/country?format=json&per_page=500';

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

    // The World Bank API returns an array: [metadata, dataArray]
    const countries = json[1]; // second element contains the country objects

    // Flatten each country
    const flatCountries = countries.map(country => flatten(country));

    console.log(flatCountries);
    return flatCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

// Call the function
const data = await fetchAndFlattenCountries();

export { data };