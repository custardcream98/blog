import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

const useDebouncedValue = <T>(value: T, delay = DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
