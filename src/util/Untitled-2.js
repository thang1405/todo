export const getList = (map, type) => {
  switch (type) {
    case "Active":
      map.forEach((value, key) => {
        if(value.checked) map.delete(key);
      })
      break;
    case "Completed":
      map.forEach((value, key) => {
        if(!value.checked) map.delete(key);
      })
    break;
  }
  return map;
};

export const isAllChecked = (list) => {
  let countCheck = 0;
  const length = list.size;
  list.forEach((value, key) => {
    if (value.checked) countCheck++;
  });
  return countCheck === length;
};

export const checkValue = (list) => {
  return isAllChecked(list);
};

export const changeALL = (map, bool) => {
  map.forEach((value, key) => {
    map.set(key, { value: value, checked: bool });
  });
  return map;
};
