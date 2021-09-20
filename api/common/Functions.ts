function mapTo<T>(obj: T): T {
  let o: any = {};

  let key: keyof T;
  for (key in obj) {
    o[key] = obj[key];
  }

  return o;
}

export { mapTo };
