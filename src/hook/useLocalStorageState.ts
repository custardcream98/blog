import { useCallback, useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

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
): [storedValue: T, setValue: React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isBrowser) {
      try {
        const localStorageValue = getLocalStorageValue<T>(key);
        return localStorageValue ?? initialValue;
      } catch (error) {
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    const localStorageListener = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        setStoredValue(getLocalStorageValue<T>(key) ?? initialValue);
      }
    };

    window.addEventListener("storage", localStorageListener);

    return () => {
      window.removeEventListener("storage", localStorageListener);
    };
  }, [initialValue, key]);

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
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
