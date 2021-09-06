import { localStorageSet } from '../utils/localStorage';
import setAuthToken from '../utils/setAuthToken';
import { IAppState } from './AppStore';

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppReducer: React.Reducer<IAppState, any> = (state, action) => {
  // console.log('AppReducer() - action:', action);
  switch (action.type || action.action) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action?.currentUser || action?.payload,
      };
    case 'SIGN_UP':
    case 'LOG_IN':
      setAuthToken(action?.payload);
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previous user data
      };
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        article: action?.payload
      }
    case 'UPDATE_ARTICLES':
    case 'GET_ARTICLES':
      return {
        ...state,
        articles: action?.payload,
      };
    case 'GET_TAGS':
      return {
        ...state,
        tags: action?.payload,
      };
    case 'SET_DARK_MODE': {
      const darkMode = action?.darkMode ?? action?.payload;
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode,
      };
    }
    default:
      return state;
  }
};

export default AppReducer;