import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getPlaceAutocomplete } from '../src/provider-api';
import { getAutoCompleteDetails, validateConfig } from '../src';

config();
validateConfig(process.env);
const apiKey = process.env.TOMTOM_API_KEY;

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', async () => {
      const res = getAutoCompleteDetails('Charlotte Street', apiKey);
      expect(res).toBeInstanceOf(Promise);
    });

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street', apiKey);
      const firstRes = res[0];
      expect(firstRes).toHaveProperty('streetNumber');
      expect(firstRes).toHaveProperty('placeId');
      expect(firstRes).toHaveProperty('countryCode');
      expect(firstRes).toHaveProperty('country');
      expect(firstRes).toHaveProperty('freeformAddress');
      expect(firstRes).toHaveProperty('municipality');
    });

    it('should return only Australian address', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street', apiKey);
      const countries = new Set(res.map((address) => address.country));
      expect(countries.size).toBe(1);
      expect(countries.has('Australia')).toBe(true);
    });
  });

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs');
      expect(res).toStrictEqual([]);
    });

    it('handles error', async () => {
      expect(getPlaceAutocomplete(apiKey, '')).rejects.toThrow();
    });
  });
});
