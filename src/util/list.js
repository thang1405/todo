export const getList = (list, type) => {
  const newMap = new Map(list);
  switch (type) {
    case "Active":
      newMap.forEach((value, key) => {
        if (value.checked) newMap.delete(key);
      });
      break;
    case "Completed":
      newMap.forEach((value, key) => {
        if (!value.checked) newMap.delete(key);
      });
      break;
    default:
      break;
  }
  return newMap;
};

export const isAllChecked = (list) => {
  let countCheck = 0;
  const length = list.size;
  list.forEach((value, key) => {
    if (value.checked) countCheck++;
  });
  return countCheck === length;
};

export const changeALL = (list, bool) => {
  list.forEach((value, key) => {
    list.set(key, { ...value, checked: bool });
  });
};
