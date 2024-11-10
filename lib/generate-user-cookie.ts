export const generateUserCookie = () =>
  `${Math.random().toString(36).slice(2).slice(1)}${Math.random().toString(21)}`;
