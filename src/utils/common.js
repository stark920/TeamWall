export const throttle = (callback, delay) => {
  let timestamp = 0;
  return (...args) => {
    if (Date.now() - timestamp > delay) {
      callback.apply(this, args);
      timestamp = Date.now();
    }
  };
};
