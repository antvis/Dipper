import React from 'react';

export default function useReferredState<T>(initialValue?: T) {
  const [state, setState] = React.useState(initialValue);
  const reference = React.useRef(state);

  const setReferredState = (value: T) => {
    reference.current = value;
    setState(value);
  };

  return [reference, setReferredState];
}
