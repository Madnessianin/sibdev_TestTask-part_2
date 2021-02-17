

import { YouTubeAPI } from '../Api/api'
import dataUsers from './../JSON/dataUsers.json'
import { getUserName } from './user-selectors'


const SET_SEARCH_VIDEO = 'Search_video/user/SET_AUTH/SET_SEARCH_VIDEO',
      SET_LOGIN_NAME = 'Search_video/user/SET_AUTH/SET_LOGIN_NAME',
      SET_TOGGLE_IS_FETCHING = 'Search_video/user/SET_TOGGLE_IS_FETCHING',
      SAVE_REQUEST = 'Search_video/user/SAVE_REQUEST'

const initialState = {
    userName: null,
    favoritesRequest: [],
    resultRequest: [],
    request: null,
    count: null ,
    isFetching: false
}


const userReducer = (state = initialState, action) => {

    switch(action.type) {

        case SET_SEARCH_VIDEO: {
            return {
                ...state,
                resultRequest: action.result,
                request: action.request,
                count: action.totalCount
            }
        }
        case SET_LOGIN_NAME: {
            return {
                ...state,
                userName: action.userName
            }
        }
        case SET_TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SAVE_REQUEST: {
            return {
                ...state,
                favoritesRequest: [
                    ...state.favoritesRequest,
                    action.newRequest
                ]
            }
        }


        default: {
            return state;
        }
    }    
}

export const setResultSearch = (result, request, totalCount) =>({type: SET_SEARCH_VIDEO, result, request, totalCount})
export const setUserName = (userName)=> ({type: SET_LOGIN_NAME, userName})
export const toggleIsFetching = (isFetching) => ({type: SET_TOGGLE_IS_FETCHING, isFetching})
export const setFavoriteRequest = (newRequest) => ({type: SAVE_REQUEST, newRequest})

/* Thunk */
export const getSearchVideo = (textRequest) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await YouTubeAPI.getVideo(textRequest)
    dispatch(toggleIsFetching(false))
    dispatch(setResultSearch(response.items, textRequest, response.pageInfo.totalResults))
}

export const saveFavoriteRequeest = (data) => async (dispatch, getState) => {
    dispatch(setFavoriteRequest(data))
    let state = getState()
    /* localStorage.setItem(`${getUserName(state)}`, ) */
}


export default userReducer;