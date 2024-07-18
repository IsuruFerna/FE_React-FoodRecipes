import { SET_USER } from "../action";

const initialState = {
   access_token: "",
   refresh_token: "",
   error: null,
};

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER:
         return {
            ...state,
            access_token: action.payload.access,
            refresh_token: action.payload.refresh,
            error: action.payload.detail,
         };

      default:
         return state;
   }
};

export default userReducer;
