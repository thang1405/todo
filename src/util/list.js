export const getList = (list, type) => {
  switch (type) {
    case "Active":
      return list.filter((x) => !x.checked);
    case "Completed":
      return list.filter((x) => x.checked);
    default:
      return list;
  }
};

export const isAllChecked = (list) => {
  let countCheck = 0;
  const length = list.length;
  list.forEach((item) => {
    if (item.checked) countCheck++;
  });
  return countCheck === length;
};

export const checkValue = (list) =>{
  return isAllChecked(list) ;
}
