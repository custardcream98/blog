import { type Dispatch, type SetStateAction, useCallback, useRef, useState } from "react";

export const useLocalStorageState = <T>(
  key: string,
  initialValue: T,
): [storedValue: T, setValue: Dispatch<SetStateAction<T>>] => {
  const storedValueRef = useRef<T>(initialValue);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      const parsedValue = value !== null ? JSON.parse(value) : initialValue;
      storedValueRef.current = parsedValue;
      return parsedValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      setStoredValue(valueToStore);
      storedValueRef.current = valueToStore;
    },
    [key],
  );

  return [storedValue, setValue];
};
