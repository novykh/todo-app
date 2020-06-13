import { useRef, useCallback } from "react";

export default (cb) => {
  const clicksRef = useRef([]);
  const timeoutRef = useRef();

  return useCallback(
    (...args) => {
      clicksRef.current = [...clicksRef.current, new Date().getTime()];
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (
          clicksRef.current.length > 1 &&
          clicksRef.current[clicksRef.current.length - 1] -
            clicksRef.current[clicksRef.current.length - 2] <
            250
        ) {
          cb(...args);
        }

        clicksRef.current = [];
      }, 250);
    },
    [cb]
  );
};
