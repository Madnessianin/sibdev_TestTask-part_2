

import { YouTubeAPI } from '../Api/api'
import dataUsers from './../JSON/dataUsers.json'

const SET_SEARCH_VIDEO = 'Search_video/auth/SET_AUTH/SET_SEARCH_VIDEO'


const initialState = {
    resultsRequest: [],
    request: null 
}


const userReducer = (state = initialState, action) => {

    switch(action.type) {

        case SET_SEARCH_VIDEO: {
            return {
                ...state,
                resultsRequest: action.result,
                request: action.request
            }
        }

        default: {
            return state;
        }
    }    
}

export const setResultSearch = (result, request) =>({type: SET_SEARCH_VIDEO, result, request})

/* Thunk */

export const getResult = (textRequest) => async (dispatch) => {
    let response = await YouTubeAPI.getVideo(textRequest)
    dispatch(setResultSearch(response.items, textRequest))
}


export default userReducer;