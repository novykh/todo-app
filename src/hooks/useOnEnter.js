import { useCallback } from "react";

export default (cb) =>
  useCallback(
    (event) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      cb(event);
    },
    [cb]
  );
