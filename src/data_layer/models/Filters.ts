export enum FilterKey {
  CLASSIFICATION = 'classification',
  CONTINENT = 'continent',
  COUNTRY = 'country',
  CENTURY = 'century',
  DISPLAY = 'display'
}

export type FilterMap = Map<FilterKey, Set<string>>;

export type ActiveFilters = Map<FilterKey, string>;
