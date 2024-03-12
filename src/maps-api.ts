import { EnvConfig, MapSearchResult } from './maps.types';
import { getPlaceAutocomplete } from './provider-api';
import { ProviderAddress, ProviderSearchResult } from './provider.types';

export function validateConfig(env: unknown): asserts env is EnvConfig {
  if (typeof env === 'object' && env && 'TOMTOM_API_KEY' in env && env.TOMTOM_API_KEY) {
    return;
  }
  throw new Error('TOMTOM_API_KEY is not set');
}

interface ProviderAddressAustralia {
  address: Omit<ProviderAddress, 'country'> & { country: 'Australia' };
  id: string;
}
const isAustraliaAddress = (result: ProviderSearchResult): result is ProviderAddressAustralia =>
  result.address.country === 'Australia';

export async function getAutoCompleteDetails(address: string, apiKey: string): Promise<MapSearchResult[]> {
  // get autocomplete results
  const res = await getPlaceAutocomplete(apiKey, address);
  // loop over and get details and map results
  return res.filter(isAustraliaAddress).map((address) => {
    return {
      placeId: address.id,
      streetNumber: address.address.streetNumber,
      countryCode: address.address.countryCode,
      country: address.address.country,
      freeformAddress: address.address.freeformAddress,
      municipality: address.address.municipality
    };
  });
}
