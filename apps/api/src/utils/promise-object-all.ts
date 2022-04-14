export type PromiseValues<TObject extends object> = {
  [TKey in keyof TObject]: Promise<TObject[TKey]>
}

export const promiseObjectAll = <TObject extends object>(promiseObject: PromiseValues<TObject>): Promise<TObject> => {
  const promiseEntries = Object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .entries<Promise<any>>(promiseObject)
    .map(([key, promise]) => promise.then(result => [key, result]));
  return Promise.all(promiseEntries).then(Object.fromEntries)
}
