import { useCallback, useEffect, useState } from 'react'

export interface IStorageProperties<T> {
  key: string
  defaultValue?: T
  getInitialValueInEffect?: boolean
  serialize?(value: T): string
  deserialize?(value: string): T
}

function serializeJSON<T>(value: T) {
  try {
    return JSON.stringify(value)
  } catch (error) {
    throw new Error('Local storage failed to serialize the value')
  }
}

function deserializeJSON(value: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const useLocalStorage = <T>({
  key,
  defaultValue = undefined,
  getInitialValueInEffect = true,
  deserialize = deserializeJSON,
  serialize = (value: T) => serializeJSON(value),
}: IStorageProperties<T>) => {
  /**
   * read the value that is in the storage under the key defined
   * @param skipStorage whether to return the default value or read the value from storage
   * @returns value in storage or default value
   */
  const readStorageValue = useCallback(
    (skipStorage?: boolean): T => {
      if (
        typeof window === 'undefined' ||
        !('localStorage' in window) ||
        window['localStorage'] === null ||
        skipStorage
      ) {
        return defaultValue as T
      }
      const storageValue = window['localStorage'].getItem(key)
      return storageValue !== null
        ? deserialize(storageValue)
        : (defaultValue as T)
    },
    [key, defaultValue, deserialize]
  )

  // set the state to the default value, or the value in the store currently
  // dependent on the getInitialValueInEffect param
  const [value, setValue] = useState<T>(
    readStorageValue(getInitialValueInEffect)
  )

  /**
   * set storage value by using the previous state or to a new value
   * @param val function that takes in the prev state and returns a new state, or a new value
   */
  const setStorageValue = useCallback(
    (val: T | ((prevState: T) => T)) => {
      if (val instanceof Function) {
        setValue((current) => {
          const result = val(current)
          window['localStorage'].setItem(key, serialize(result))
          return result
        })
      } else {
        window['localStorage'].setItem(key, serialize(val))
        setValue(val)
      }
    },
    [key, serialize]
  )

  /**
   * remove the key from the store
   */
  const removeStorageValue = useCallback(() => {
    window['localStorage'].removeItem(key)
  }, [key])

  /**
   * set the storage value when any of the init parameters change
   */
  useEffect(() => {
    if (defaultValue !== undefined && value === undefined) {
      setStorageValue(defaultValue)
    }
  }, [defaultValue, value, setStorageValue])

  /**
   * set the initial value when the hook is initialized
   */
  useEffect(() => {
    if (getInitialValueInEffect) {
      setValue(readStorageValue())
    }
  }, [getInitialValueInEffect, readStorageValue])

  return [
    value === undefined ? defaultValue : value,
    setStorageValue,
    removeStorageValue,
  ] as const
}
