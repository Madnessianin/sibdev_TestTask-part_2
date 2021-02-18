import React from 'react'
import { connect } from 'react-redux';
import MySearch from './Search';
import {getSearchVideo, saveFavoriteRequest} from './../../../Redux/user-reducer'
import { getTextRequest, getTotalCount, getResult, getIsFetching } from '../../../Redux/user-selectors';

class SearchConteiner extends React.Component {

    render() {
        return <MySearch result={this.props.result}
                         textRequest={this.props.textRequest}
                         isResult={this.props.isResult}
                         getSearchVideo={this.props.getSearchVideo}
                         totalCount={this.props.totalCount}
                         isFetching={this.props.isFetching}
                         saveRequest={this.props.saveFavoriteRequest} />
    }

}

let mapStateToProps = (state) =>{
    return {
        result: getResult(state),
        textRequest: getTextRequest(state),
        totalCount: getTotalCount(state),
        isFetching: getIsFetching(state)
    }
}


let mapDispatchToProps =  {
    getSearchVideo,
    saveFavoriteRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchConteiner);