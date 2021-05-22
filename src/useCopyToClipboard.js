import React, {useState} from "react";
import copy from "copy-to-clipboard";



export default function useCopyToClipboard(resetInterval = null) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = React.useCallback((text) => {
     
      copy(text.toString());
      setCopied(true);
    } 
  , []);

  React.useEffect(() => {
    let timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
}