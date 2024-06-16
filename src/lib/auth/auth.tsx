import { AuthResponse, User } from '@/types/api';

import { api } from '../api-client';

import { configureAuth } from './auth-configure';
import type { RegisterInput, LoginInput } from './auth-schemas';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = (): Promise<User> => {
  return api.get('/auth/me');
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
