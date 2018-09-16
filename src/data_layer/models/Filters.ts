export enum FilterKey {
  CLASSIFICATION = 'classification',
  CONTINENT = 'continent',
  COUNTRY = 'country',
  CENTURY = 'century',
  DISPLAY = 'display'
}

export type ReducedFilterMap = Map<FilterKey, Map<string, number>>;

export type ActiveFilters = Map<FilterKey, string>;
