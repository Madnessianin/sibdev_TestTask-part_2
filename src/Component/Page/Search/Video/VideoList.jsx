import React, { useState } from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import {AppstoreOutlined, BarsOutlined} from '@ant-design/icons'
import './video.css'

const VideoList = React.memo((props) => {
    const [videoId, setVideoId] = useState(null)

    const styles = []

    const videos = props.videos.map(video => <VideoItem key = {video.id.videoId}
                                                        snippet = {video.snippet}
                                                        videoId = {video.id.videoId}
                                                        onClick = {()=>{setVideoId(video.id.videoId)}} />)
    
    console.log(props.videos)
    
    return (
    <div className="video">
        <Switch>
            <Route exact path = "/page/search" render = {()=><Redirect to = {`/page/search/result/${props.textRequest}`}/>}/>
            <Route path="/page/search/result/:textRequest?" render = {()=><VideoGrid textRequest = {props.textRequest}
                                                                       videos={videos} />} />
            <Route path="/page/search/watch/:videoId?" render={()=><Video videoId={videoId} />} />
        </Switch>
    </div>)
})

const VideoGrid = ({videos, textRequest}) => {

    const [listMode, setListMode] = useState(false)

    return (
        <div className="video_wrapper">
            <div className="video_request">
                <div className="video_request_item">{`Видео по запросу "${textRequest}"`}</div>
                <div className="video_request_item">
                    <div onClick={()=>{setListMode(false)}} className="video_request_icon">
                        <AppstoreOutlined />
                    </div>
                    <div onClick={()=>{setListMode(true)}} className="video_request_icon">
                        <BarsOutlined />
                    </div>
                </div>
            </div>
            <div className={listMode ? "video_inner_list" : "video_inner_grid"}>{videos}</div>
        </div>
    )
}

const VideoItem = ({snippet, onClick, videoId}) => {
    return (
    <NavLink to={`/page/search/watch/${videoId}`}>
        <div className="video_item" onClick={onClick}>
            <img className="video_img" src={snippet.thumbnails.high.url} />
            <div className="video_title">{snippet.title}</div>
            <div className="video_chanelTitle">{snippet.channelTitle}</div>
        </div>
    </NavLink>
)}

const Video = ({videoId})=> {
    return (<div className="video_play">
                <iframe width="100%" 
                        height="600" 
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen />
    </div>)
}


export default VideoList;