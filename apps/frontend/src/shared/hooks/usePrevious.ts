import {useEffect, useRef, useState} from 'react';

export const usePrevious = <T>(value: T): T => {
  const [, setCurrent] = useState<T>(value);
  const ref = useRef<T>();

  useEffect(() => {
    setCurrent((current) => {
      ref.current = current;
      return value;
    });
  }, [value]);

  return ref.current as T;
}
