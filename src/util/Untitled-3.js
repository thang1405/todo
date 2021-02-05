import { produce } from "immer";
import { getList, isAllChecked, changeALL } from "../util/list";
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
  list: new Map(),
  cunrrentIndex: 3,
};

export const reducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD:
        if (draft.input.trim() !== "") {
          draft.list.set(draft.cunrrentIndex, {
            value: draft.input,
            checked: false,
          });
        }
        draft.input = "";
        draft.cunrrentIndex++;
        break;
      case ON_CHANGE:
        draft.input = action.value;
        break;
      case CHANGE_CHECK:
        let currentItem = draft.list.get(action.value);
        currentItem.checked = !currentItem.checked;
        draft.list.set(action.value, currentItem);
        break;
      case DELETE_ITEM:
        draft.list.delete(action.value);
        break;
      case CHANGE_ALL:
        if (isAllChecked(draft.list)) {
          changeALL(draft.list, false);
        } else {
          changeALL(draft.list, true);
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
