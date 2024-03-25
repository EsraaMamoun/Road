import { useState, useEffect } from 'react';

export function useClockValue(interval = 1000) {
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock((prev) => prev + interval);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return clock;
}

export function useCustomValue(initialValue) {
  const [value, setValue] = useState(initialValue);

  const updateValue = (newValue) => {
    setValue(newValue);
  };

  return {
    value,
    updateValue,
  };
}
