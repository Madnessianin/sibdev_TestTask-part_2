

import { YouTubeAPI } from '../Api/api'
import dataUsers from './../JSON/dataUsers.json'

const SET_SEARCH_VIDEO = 'Search_video/auth/SET_AUTH/SET_SEARCH_VIDEO',
      SET_LOGIN_NAME = 'Search_video/auth/SET_AUTH/SET_LOGIN_NAME',
      SET_TOGGLE_IS_FETCHING = 'Search_video/auth/SET_TOGGLE_IS_FETCHING'

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

        default: {
            return state;
        }
    }    
}

export const setResultSearch = (result, request, totalCount) =>({type: SET_SEARCH_VIDEO, result, request, totalCount})
export const setUserName = (userName)=> ({type: SET_LOGIN_NAME, userName})
export const toggleISFetching = (isFetching) => ({type: SET_TOGGLE_IS_FETCHING, isFetching})

/* Thunk */
export const getSearchVideo = (textRequest) => async (dispatch) => {
    dispatch(toggleISFetching(true))
    let response = await YouTubeAPI.getVideo(textRequest)
    dispatch(toggleISFetching(false))
    dispatch(setResultSearch(response.items, textRequest, response.pageInfo.totalResults))
}


export default userReducer;