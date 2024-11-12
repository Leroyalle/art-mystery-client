export const PALETTE_ITEMS = [
  { value: 'red', color: 'bg-red-500' },
  { value: 'orange', color: 'bg-orange-500' },
  { value: 'yellow', color: 'bg-yellow-500' },
  { value: 'green', color: 'bg-green-500' },
  { value: 'teal', color: 'bg-teal-500' },
  { value: 'blue', color: 'bg-blue-500' },
  { value: 'indigo', color: 'bg-indigo-500' },
  { value: 'violet', color: 'bg-violet-500' },
  { value: 'pink', color: 'bg-pink-500' },
  { value: 'black', color: 'bg-black' },
  { value: 'white', color: 'bg-white' },
];

export const getSafelistClasses = () => PALETTE_ITEMS.map((item) => item.color);
