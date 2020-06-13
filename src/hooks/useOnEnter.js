import { useCallback } from "react";

export default (callback) =>
  useCallback(
    (event) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      callback(event);
    },
    [callback]
  );
