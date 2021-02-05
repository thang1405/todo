import { produce } from "immer";
import { getList, isAllChecked } from "../util/list";
import {
  ADD,
  ON_CHANGE,
  CHANGE_CHECK,
  DELETE_ITEM,
  CHANGE_ALL,
  CHANGE_FILLTER,
  CLEAR_COMPLETED,
} from "../action";

export const initState = {
  input: "",
  type: "All",
  list: [
    {
      value: "naruto 1",
      checked: true,
      index:0
    },
    {
      value: "one piece 2",
      checked: false,
      index:1
    },
    {
      value: "Neel 3",
      checked: true,
      index:2
    },
  ],
  cunrrentIndex : 3
};

export const reducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD:
        if (draft.input.trim() !== "") {
          draft.list.push({
            value: draft.input,
            checked: false,
            index: draft.cunrrentIndex
          });
        }
        draft.input = "";
        draft.cunrrentIndex ++;
        break;
      case ON_CHANGE:
        draft.input = action.value;
        break;
      case CHANGE_CHECK:
        draft.list[action.value].checked = !draft.list[action.value].checked;
        break;
      case DELETE_ITEM:
        console.log(action.value);
        let list = draft.list.map((item,index) =>{
            return  {
              value :item.value,
              checked : item.checked,
              index: item.index
            } 
        });
        draft.list = list.filter((x, i) => i !== action.value);
        break;
      case CHANGE_ALL:
        if (isAllChecked(draft.list)) {
          draft.list = draft.list.map((x) => ({
            value: x.value,
            checked: false,
            index: x.index
          }));
        } else {
          draft.list = draft.list.map((x) => ({
            value: x.value,
            checked: true,
            
          }));
        }
        break;
      case CHANGE_FILLTER:
        draft.type = action.value;
        break;
      case CLEAR_COMPLETED:
        draft.list = getList(draft.list, "Active");
        break;
      default:
        throw new Error();
    }
  });
