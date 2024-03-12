import axios from 'axios';
import { ProviderSearchResult } from './provider.types';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string): Promise<ProviderSearchResult[]> {
  const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
    params: {
      key,
      limit: 100
    }
  });
  return autocomplete.data.results;
}
