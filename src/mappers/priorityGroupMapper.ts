type StrOrNum = string | number;
type MapObj<T> = {[key in StrOrNum]: T};
type ArrObj<T> = {[key in keyof T]: StrOrNum};
type Mapper<T> = {[key in keyof T]?: (key: StrOrNum) => any};
type Filter<T> = (item: T) => boolean;

export function priorityGroupMapper<T extends ArrObj<T>>(arr: T[], sortKey: keyof T, groupKey: keyof T, mapper?: Mapper<T>, filter?: Filter<T>): T[] {
  const map = {} as MapObj<T>;

  for (const item of arr) {
    if (filter && !filter(item)) {
      continue;
    }

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
        const [ val, func ] = [ map[key][mapKey], mapper[mapKey]];
        if(typeof func === "function"){
          map[key][mapKey] = func(val);
        }
      }
    }

    result.push({
      ...map[key],
    });
  }

  return result;
}
