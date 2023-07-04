import { makeVar, ReactiveVar } from '@apollo/client';

export const authStore: ReactiveVar<number | undefined> = makeVar(undefined as number | undefined);

interface UserInfo {
  id: string;
  email: string;
  country: string;
  city: string;
  nickname: string;
}

export const userStore: ReactiveVar<UserInfo | undefined> = makeVar(undefined as UserInfo | undefined);
