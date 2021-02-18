import { YouTubeAPI } from '../Api/api'

import { getUserName, getFavoritesRequest } from './user-selectors'


const SET_SEARCH_VIDEO = 'Search_video/user/SET_AUTH/SET_SEARCH_VIDEO',
      SET_LOGIN_NAME = 'Search_video/user/SET_AUTH/SET_LOGIN_NAME',
      SET_TOGGLE_IS_FETCHING = 'Search_video/user/SET_TOGGLE_IS_FETCHING',
      SAVE_REQUEST = 'Search_video/user/SAVE_REQUEST',
      CHANGE_REQUEST = 'Search_video/user/CHANGE_REQUEST'

const login = localStorage.getItem(`${localStorage.getItem('user')}`)

let favoritesRequest = JSON.parse(localStorage.getItem(login))
if (favoritesRequest == null) {
    favoritesRequest = []
}
const saveChangeInLOcalStorage = (getState) => {
    let state = getState()
    let name = getUserName(state)
    let favoritesRequest = getFavoritesRequest(state)
        
    localStorage.setItem(`${name}`, JSON.stringify(favoritesRequest))
}

const initialState = {
    userName: login,
    favoritesRequest: favoritesRequest,
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
                    ...state.favoritesRequest, {
                        "id": state.favoritesRequest.length + 1,
                        "request": action.newRequest.request,
                        "nameRequest": action.newRequest.nameRequest,
                        "sort": action.newRequest.sort,
                        "max_result": action.newRequest.max_result
                    }
                ]
            }
        }
        case CHANGE_REQUEST: {
            return {
                ...state,
                favoritesRequest: [
                    ...state.favoritesRequest.map(request => {
                        if (request.id == action.requestId) {
                            return action.changedRequest
                        }
                        return request
                    })
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
export const setchangedRequest = (requestId, changedRequest) =>({type: CHANGE_REQUEST, requestId, changedRequest})

/* Thunk */
export const getSearchVideo = (textRequest) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await YouTubeAPI.getVideo(textRequest)
    dispatch(toggleIsFetching(false))
    dispatch(setResultSearch(response.items, textRequest, response.pageInfo.totalResults))
}

export const saveFavoriteRequest = (data) => async (dispatch, getState) => {
    dispatch(setFavoriteRequest(data))
    saveChangeInLOcalStorage(getState)
}

export const changeFavoriteRequest = (requestId, changedRequest) => async (dispatch, getState) => {
    dispatch(setchangedRequest(requestId, changedRequest))
    saveChangeInLOcalStorage(getState)
}


export default userReducer;