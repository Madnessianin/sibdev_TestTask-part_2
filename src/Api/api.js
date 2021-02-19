import * as axios from "axios"

let instance = axios.create({
    baseURL : "https://www.googleapis.com/youtube/v3",
    params : {
        part: 'snippet',
        key :  "AIzaSyDAEqOTI5TxwfORemp3higobty5cWOrWiU",
        type: "video"
    }
})

export const YouTubeAPI = {
    async getVideo(requestText, maxResults, order) {
        let response = await instance.get(('/search'), {
            params: {
                q: requestText,
                maxResults: maxResults,
                order: order
            }
        })
        return response.data
    }
}