import { useEffect } from "react";

import { focusManager } from "react-query";

function useDisableRefetchOnFocus() {
  useEffect(() => {
    focusManager.setFocused(false);
    return () => focusManager.setFocused(undefined);
  }, []);
}

export default useDisableRefetchOnFocus;
