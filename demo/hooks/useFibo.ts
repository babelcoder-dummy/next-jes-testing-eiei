import { useState } from 'react';

const useFibo = () => {
  const [n, setN] = useState(0);
  const [m, setM] = useState(1);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setN(m);
    setM(n + m);
    setCurrent(m);
  };

  return { current, next };
};

export default useFibo;
