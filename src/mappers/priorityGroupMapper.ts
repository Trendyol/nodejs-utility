export function priorityGroupMapper<X>(arr: {[key:string]: any}[], sortKey: string, groupKey: string, mapper?: {[key:string]: (key: any) => any}): X[] {
  const map: {[key: string]: any; } = {};

  for (const item of arr) {
    const seperator = item[groupKey];
    if (!map.hasOwnProperty(seperator)) {
      map[seperator] = item;
      continue;
    }

    if (item[sortKey] > map[seperator][sortKey]) {
      map[seperator] = item;
    }
  }

  const result = [];
  for (const key in map) {
    if (mapper) {
      for (const mapKey in mapper) {
        const val = map[key][mapKey];
        map[key][mapKey] = mapper[mapKey](val);
      }
    }

    result.push({
      ...map[key],
    });
  }

  return result;
}
