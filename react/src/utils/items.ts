import items from './tft/items.json';

export const findItemById = (id:number) => {
  const item = items.find(item => item && item.id === id);
  return item ? item.name : '';
}