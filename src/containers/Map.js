// == Import : npm
import { connect } from "react-redux";

// == Import : local
import Map from "src/components/Map";

// Action Creators
import { updateViewport } from "src/store/reducer";

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
  viewport: state.viewport,
  mapboxApiAccessToken: state.mapboxApiAccessToken,
  mapStyle: state.mapStyle
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  // doSomething: () => {
  //   dispatch(doSomething("Coucou"));
  // }
  updateViewport: mapChange => {
    dispatch(updateViewport(mapChange));
    // console.log(mapChange);
  }
});

// Container
const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

// == Export
export default MapContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
*/
