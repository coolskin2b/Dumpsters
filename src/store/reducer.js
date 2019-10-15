// == Initial State
const initialState = {
  //https://github.com/uber/react-map-gl/blob/master/docs/advanced/viewport-transition.md
  viewport: {
    //ATTENTION Garder L'ordre Latitude Longitude !!!!
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  },
  //Token pour mapboxApi
  mapboxApiAccessToken:
    "pk.eyJ1IjoiY29vbHNraW4yYiIsImEiOiJjazFtaTBwZ3IwMHdqM3ByMGs1ZW42MjB5In0.4_OP7fER3iedwRMZqfDppg",
  //Plusieurs style par defaut sont dispos on peut meme
  //creer le notre ou afficher different type de vue
  //suivant utilisateur
  mapStyle: "mapbox://styles/mapbox/streets-v9"
};

// == Types
const DO_SOMETHING = "DO_SOMETHING";
const UPDATE_VIEWPORT = "UPDATE_VIEWPORT";

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_SOMETHING:
      return {
        ...state,
        message: action.message
      };
    case UPDATE_VIEWPORT:
      // console.log(action);
      return {
        ...state,
        viewport: action.viewport
      };

    default:
      return state;
  }
};

// == Action Creators
export const doSomething = message => ({
  type: DO_SOMETHING,
  message
});

export const updateViewport = viewport => ({
  type: UPDATE_VIEWPORT,
  viewport
});

// == Selectors

// == Export
export default reducer;
