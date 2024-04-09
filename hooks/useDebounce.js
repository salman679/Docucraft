import { useEffect, useRef } from "react";

export default function useDebounce(callback, delay) {
  const timeOutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...arg) => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      callback(...arg);
    }, delay);
  };

  return debouncedCallback;
}
