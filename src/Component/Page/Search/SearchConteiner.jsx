import React from 'react'
import { connect } from 'react-redux';
import MySearch from './Search';
import {getResult} from './../../../Redux/user-reducer'

class SearchConteiner extends React.Component {


        render() {
            return <MySearch result={this.props.result}
                             isResult={this.props.isResult}
                             getResult={this.props.getResult} />
        }

}

let mapStateToProps = (state) =>({
    result: state.user.resultsRequest,
    textRequest: state.user.request
})


let mapDispatchToProps =  {
    getResult
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchConteiner);