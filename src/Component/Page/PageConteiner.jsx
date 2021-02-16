import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { logout } from '../../Redux/auth-reducer'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import Page from './Page'


class PageConteiner extends React.Component {


        render() {
            return <Page name = {this.props.name}
                         logout = {this.props.logout} />
        }

}

let mapStateToProps = (state) =>({
    
})


let mapDispatchToProps =  {
    logout
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(PageConteiner);