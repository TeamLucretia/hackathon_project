export enum FilterKey {
  CLASSIFICATION = 'classification',
  CONTINENT = 'continent',
  COUNTRY = 'country',
  STYLE = 'style',
  ONVIEW = 'onView'
}

export type FilterMap = Map<FilterKey, Set<string>>;

export type ActiveFilters = Map<FilterKey, string>;
