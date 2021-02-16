import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../Redux/auth-reducer'
import Login from './Login'


class LoginConteiner extends React.Component {


        render() {
            return <Login isAuth = {this.props.isAuth}
                          login = {this.props.login} />
        }

}

let mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})


let mapDispatchToProps =  {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginConteiner);