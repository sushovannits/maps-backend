export interface EnvConfig {
  TOMTOM_API_KEY: string;
}

export interface MapSearchResult {
  placeId: string;
  streetNumber: string;
  countryCode: string;
  country: 'Australia';
  freeformAddress: string;
  municipality: string;
}
