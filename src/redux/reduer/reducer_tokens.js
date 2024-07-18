import { SET_TOKENS } from "../action/action_token";

const initialState = {
   access_token: "",
   refresh_token: "",
   error: null,
};

const tokenReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_TOKENS:
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

export default tokenReducer;
