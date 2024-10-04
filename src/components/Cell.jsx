import React, { useState, useEffect } from 'react';

const formatter = new Intl.NumberFormat('sr-RS', {
  style: 'decimal', // or 'currency', 'percent'
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// eslint-disable-next-line react/prop-types
const Cell = (props) => {
  const { children, ...otherProps } = props;

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

  let value = children;

  const showZero = props.showZero === undefined ? false : props.showZero;

  if (value == 0 && showZero === false) {
    value = '';
  } else {
    value = formatter.format(value);
  }

  return (
    <td className={isChanged ? 'changed' : ''} {...otherProps}>
      {value}
    </td>
  );
};

export default Cell;
