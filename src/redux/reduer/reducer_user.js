import { REMOVE_USER_DATA, SET_USER_DATA } from "../action/action_user";

const initialState = {
   user_id: "",
   username: "",
};

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            user_id: action.payload.user_id,
            username: action.payload.username,
         };

      case REMOVE_USER_DATA:
         return {
            ...state,
            user_id: "",
            username: "",
         };

      default:
         return state;
   }
};

export default userReducer;
