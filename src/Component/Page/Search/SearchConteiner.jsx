import React from 'react'
import { connect } from 'react-redux';
import MySearch from './Search';
import {getSearchVideo, saveFavoriteRequeest} from './../../../Redux/user-reducer'
import { getTextRequest, getTotalCount, getResult, getIsFetching } from '../../../Redux/user-selectors';

class SearchConteiner extends React.Component {

    render() {
        return <MySearch result={this.props.result}
                            isResult={this.props.isResult}
                            getSearchVideo={this.props.getSearchVideo}
                            totalCount={this.props.totalCount}
                            isFetching={this.props.isFetching}
                            saveRequeest={this.props.saveFavoriteRequeest} />
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
    saveFavoriteRequeest
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchConteiner);