import dataUsers from './../JSON/dataUsers.json'
import { setUserName } from './user-reducer'

const SET_AUTH = 'Search_video/auth/SET_AUTH'

const tokenGenerator = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
}

const isAuth = localStorage.getItem('user') !== null

const initialState = {
    isAuth: isAuth
}



const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            };
        }

        
        default : {
            return state;
        }
    }
    
}

export const setAuth = (isAuth) => ({type: SET_AUTH, isAuth})

/* Thunk */
export const login = (data) => (dispatch) => {
    dataUsers.users.forEach(user => {
        if (data.login == user.login && data.password == user.pasword) {
            dispatch(setAuth(true))
            dispatch(setUserName(data.login))
            let token = tokenGenerator()
            localStorage.setItem('user', token) 
            localStorage.setItem(token, data.login)              
        }
    })
}

export const logout = () => (dispatch) => {
    dispatch(setAuth(false))
    localStorage.removeItem(localStorage.getItem('user'))
    localStorage.removeItem('user')
}


export default authReducer;