import React from 'react'
import { connect } from 'react-redux';
import { getFavoritesRequest } from '../../../Redux/user-selectors';
import Favorites from './Favorites';



class FavoritesConteiner extends React.Component {


        render() {
            return <Favorites favoritesRequest={this.props.favoritesRequest} />
        }

}

let mapStateToProps = (state) =>{
    return {
        favoritesRequest: getFavoritesRequest(state)
    }
}

export default connect(mapStateToProps, {})(FavoritesConteiner);