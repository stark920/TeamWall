import dayjs from "dayjs";

/**
 *
 * @param {Date} time
 * @param {string} formate
 * @returns {string}
 */

export const formateTime = (time, formate = "YYYY/MM/DD HH:mm") => {
  return dayjs(time).format(formate);
};
