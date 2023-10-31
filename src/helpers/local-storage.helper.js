export const setLocalStorageItemsHelper = (items) => {
  try {
    Object.keys(items).forEach((key) => {
      localStorage.setItem(key, items[key].toString());
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorageItemsHelper = () => {
  const items = {};

  Object.keys(localStorage).forEach((key) => {
    items[key] = localStorage[key];
  });

  return items;
};

export const removeLocalStorageItemsHelper = (keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
