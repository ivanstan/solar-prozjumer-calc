import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Cell = ({ children }) => {
  const [prevValue, setPrevValue] = useState(children);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (children !== prevValue) {
      setIsChanged(true);
      setPrevValue(children);

      const timeout = setTimeout(() => {
        setIsChanged(false);
        clearTimeout(timeout);
      }, 1500);
    }
  }, [children, prevValue]);

  return (
    <td className={isChanged ? 'changed' : ''}>
      {children}
    </td>
  );
};

export default Cell;
