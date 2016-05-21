const trace = (fn) => (...args) => {
  const ret = fn(...args);
  console.log({fn, args, ret}); // eslint-disable-line no-console
  return ret;
};

export default trace;
