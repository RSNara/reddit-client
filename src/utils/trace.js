const trace = (fn) => (...args) => {
  const ret = fn(...args);
  console.log({fn, args, ret});
  return ret;
};

export default trace;
