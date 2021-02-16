import * as axios from "axios"

let instance = axios.create({
    baseURL : "https://www.googleapis.com/youtube/v3",
    params : {
        part: 'snippet',
        maxResults: 12,
        key :  "AIzaSyDAEqOTI5TxwfORemp3higobty5cWOrWiU"
    }
})

export const YouTubeAPI = {
    async getVideo(requestText) {
        let response = await instance.get(('/search'), {
            params: {
                q: requestText
            }
        })
        return response.data
    }
}