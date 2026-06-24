declare module 'react-select-country-list' {
  export interface CountryOption {
    label: string;
    value: string;
  }

  export interface CountryListApi {
    getData(): CountryOption[];
    getLabel(countryCode: string): string;
    getValue(countryName: string): string;
  }

  export default function countryList(): CountryListApi;
}
