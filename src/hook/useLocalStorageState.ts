import { type Dispatch, type SetStateAction, useCallback, useState } from "react";

const getLocalStorageValue = <T>(key: string) => {
  try {
    const value = localStorage.getItem(key);
    const parsedValue = value !== null ? JSON.parse(value) : null;
    return parsedValue as T | null;
  } catch (error) {
    return null;
  }
};

export const useLocalStorageState = <T>(
  key: string,
  initialValue: T,
): [storedValue: T, setValue: Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localStorageValue = getLocalStorageValue<T>(key);
      return localStorageValue ?? initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      setStoredValue((prevValue) => {
        const nextValue = value instanceof Function ? value(prevValue) : value;
        localStorage.setItem(key, JSON.stringify(nextValue));

        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, setValue];
};
