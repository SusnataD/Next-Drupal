import { GET_GLOBAL_ELEMENTS } from "../actions/actionType";

const initState = {
  mainMenu: [],
  rightSideMenu: [],
  footerMainMenu: [],
  footerQuickLinks: [],
  copyright: [],
  socialMedia: [],
};

const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_GLOBAL_ELEMENTS:
      return {
        ...state,
        mainMenu: !action.error ? action.payload : state.mainMenu,
        rightSideMenu: !action.error ? action.payload : state.rightSideMenu,
        footerMainMenu: !action.error ? action.payload : state.footerMainMenu,
        footerQuickLinks: !action.error
          ? action.payload
          : state.footerQuickLinks,
        copyright: !action.error ? action.payload : state.copyright,
        socialMedia: !action.error ? action.payload : state.socialMedia,
      };
    default:
      return state;
  }
};

export default commonReducer;
