import { useEffect, useRef } from "react";

// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

/* istanbul ignore next */
/** keep typescript happy */
const noop = () => {};

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    if (delay === null) return undefined;
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
