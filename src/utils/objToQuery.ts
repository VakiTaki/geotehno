export interface KeyValueObject {
  [key: string]: string | number;
}

export function objectToQueryString(obj: KeyValueObject): string {
  const keyValuePairs: string[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key].toString())
      );
    }
  }

  return (keyValuePairs.length > 0 ? "?" : "") + keyValuePairs.join("&");
}
