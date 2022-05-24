export const throttle = (callback, delay) => {
  let timestamp = 0;
  return (...args) => {
    if (Date.now() - timestamp > delay) {
      callback.apply(this, args);
      timestamp = Date.now();
    }
  };
};

export const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};
