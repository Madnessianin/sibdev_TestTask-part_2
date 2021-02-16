import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import './Search.css'
import VideoList from './Video/VideoList';
import {HeartOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';

import { Field, reduxForm } from 'redux-form';

const { Search } = Input;

const MySearch = (props) => {
    
    const [textRequest, setTextRequest] = useState(props.textRequest)   

    useEffect(()=>{
        setTextRequest(props.textRequest)
    }, [props.textRequest])

    const onSearch = text => {
        props.getResult(text)
        setTextRequest(text)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const suffix = (
        <div onClick={()=>{setIsModalVisible(true)}} className="search_inner_suffix">
            <HeartOutlined style={{ fontSize: 16, color: '#1890ff'}}/>
        </div>
    );

    const onSubmit = (data) => {

        setIsModalVisible(false)
    }

    return (
        <div className="search">
            <h1 className="search_title">Поиск видео</h1>
            <div className="search_inner">
                <Search placeholder={textRequest || "Что хотите посмотреть?"}
                        enterButton="Найти"
                        size="large"
                        suffix={suffix}
                        onSearch={onSearch}/>
            </div>
            {textRequest 
            ? <VideoList videos={props.result}
                         textRequest={textRequest} />
            : <></>}
            <Modal title="Сохранить запрос" 
                   visible={isModalVisible}
                   centered 
                   footer={null}>
                
                <ReduxRequestForm onSubmit={onSubmit}  
                                  onCancel={()=>{setIsModalVisible(false)}}
                                  textRequest={textRequest} />
                
            </Modal>
        </div>
    )
}

const MyInput = (props) => {
    return (
        <Input {...props}  />
    )
}

const MySelect = () => {
    return (
        <Select defaultValue="1">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
        </Select>
    )
}



const RequestForm = (props) => {
    return (
        <form className="request_form" onSubmit = {props.handleSubmit}>
            <div className="request_field">
                <label className = "request_field_label" htmlFor = "request">Запрос</label>
                <Field  placeholder={props.textRequest}
                        name="request"
                        id="request"
                        component={MyInput}
                        disabled />    
            </div>
            <div className="request_field">
                <label className = "request_field_label" htmlFor = "name">Имя</label>
                <Field  name="name"
                        type="text"
                        id="name"
                        component={MyInput}/>    
            </div>
            <div className="request_field">
                <label className = "request_field_label" htmlFor = "select">Сортировать по</label>
                <Field  name="select"
                        id="select"
                        component={MySelect} />    
            </div>
            <div className="request_btns">
                <div className="request_btns_item">
                    <Button type="primary" onClick={props.onCancel}>
                        Отмена
                    </Button>
                </div>
                <div className="request_btns_item">
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </div>
            </div>
            
        </form>
    )
}
const ReduxRequestForm = reduxForm({form: 'saveRequest'})(RequestForm)

export default MySearch;

