import { AuthParams } from './types';
import instance from '../axios';

export const authApi = {
  signIn(body: AuthParams) {
    return instance.post('/users/login', body);
  },
  signUp(body: AuthParams) {
    return instance.post('/users/create', body);
  },
};
