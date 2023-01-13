import { AxiosError } from 'axios';

export const handleError = (err: ErrorEvent) => {
  if (err instanceof AxiosError) {
    alert(err.response?.data.details);
  } else {
    alert('undefined error. check console log');
    console.log(err);
  }
};
