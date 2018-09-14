export enum FilterKey {
  CLASSIFICATION = 'classification',
  CONTINENT = 'continent',
  COUNTRY = 'country',
  CENTURY = 'century',
  ONVIEW = 'onView'
}

export type FilterMap = Map<FilterKey, Set<string>>;

export type ActiveFilters = Map<FilterKey, string>;