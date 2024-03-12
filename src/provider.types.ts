export interface ProviderAddress {
  country: string;
  countryCode: string;
  freeformAddress: string;
  municipality: string;
  streetNumber: string;
}
export interface ProviderSearchResult {
  address: ProviderAddress;
  id: string;
}
