import React from "react";
import { connect } from "react-redux";
import { getFavoritesRequest } from "../../../Redux/user-selectors";
import {
  getSearchVideo,
  changeFavoriteRequest,
} from "../../../Redux/user-reducer";
import Favorites from "./Favorites";

class FavoritesConteiner extends React.Component {
  render() {
    return (
      <Favorites
        favoritesRequest={this.props.favoritesRequest}
        getSearchVideo={this.props.getSearchVideo}
        changeRequest={this.props.changeFavoriteRequest}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesRequest: getFavoritesRequest(state),
  };
};
const mapDispatchToProps = {
  getSearchVideo,
  changeFavoriteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesConteiner);
