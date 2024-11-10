export const generateUniqueRoom = () => {
  return `${Math.random().toString(36).slice(2)}${
    Math.random().toString(36).slice(2).length * Math.random().toString(36).slice(2).length
  }`;
};
