/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
// DONE
export const CHANGE_TAGS = createActionName('CHANGE TAGS');
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// TODO - add other action creators
// DONE
export const changeTags = payload => ({ payload, type: CHANGE_TAGS });
export const changeDuration = payload => ({ payload, type: CHANGE_DURATION });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE: {
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    }
    // TODO - handle other action types
    // DONE
    case CHANGE_TAGS: {
      return {
        ...statePart,
        tag: action.payload,
      };
    }
    case CHANGE_DURATION: {
      return {
        ...statePart,
        duration: action.payload,
      };
    }
    default:
      return statePart;
  }
}
