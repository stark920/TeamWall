import dayjs from "dayjs";

export const formateTime = (time, formate = "YYYY/MM/DD HH:mm") => {
  return dayjs(time).format(formate);
};
