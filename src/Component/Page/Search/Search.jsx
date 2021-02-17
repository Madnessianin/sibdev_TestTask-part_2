import { Button, Input, Select, Form, Row, Col, InputNumber, Slider } from 'antd';
import React, { useEffect, useState } from 'react'
import './Search.css'
import VideoList from './Video/VideoList';
import {HeartOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';

import { Field, reduxForm } from 'redux-form';
import Preloader from '../../Common/Preloader/Preloader';

const { Search } = Input;

const MySearch = (props) => {
    
    const [textRequest, setTextRequest] = useState(props.textRequest)   

    useEffect(()=>{
        setTextRequest(props.textRequest)
    }, [props.textRequest])

    const onSearch = text => {
        props.getSearchVideo(text)
        setTextRequest(text)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const suffix = (
        <div onClick={()=>{setIsModalVisible(true)}} className="search_inner_suffix">
            <HeartOutlined style={{ fontSize: 16, color: '#1890ff'}}/>
        </div>
    );

    const onSubmit = (data) => {
        console.log(data)
        props.saveRequeest(data)
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
            {props.isFetching ? <div className = "preloader"><Preloader /></div> : null}
            {textRequest ? <VideoList videos={props.result}
                                      textRequest={textRequest}
                                      totalCount={props.totalCount} />
            : null}
            <Modal title="Сохранить запрос" 
                   visible={isModalVisible}
                   centered 
                   footer={null}>
                
                <RequestForm onSubmit={onSubmit}  
                                  onCancel={()=>{setIsModalVisible(false)}}
                                  textRequest={textRequest} />
                
            </Modal>
        </div>
    )
}

const RequestForm = (props) => {
    
    const [inputValue, setInputValue] = useState(12)

    const onChange = (value) => {
        setInputValue(value)
    }

    const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };
    
    return (
        <Form {...layout} className="request_form" name="save_request" onFinish = {props.onSubmit}>
            <Form.Item  name="request"
                        label="Запрос"
                        initialValue={props.textRequest}>
                <Input disabled />
            </Form.Item>
            <Form.Item  name="nameRequest"
                        label="Название"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите название запроса!',
                            }, ]}>
                <Input  />
            </Form.Item>
            <Form.Item initialValue="1" name="sort" label="Сортировать по">
                <Select>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="max_result" label="Максимум" initialValue={inputValue}>
                <Row>
                    <Col span={12}>
                        <Slider min={1} max={50} onChange={onChange} value={inputValue} />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={50}
                            style={{ marginLeft: 16 }}
                            value={inputValue}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
            
        </Form>
    )
}
/* const ReduxRequestForm = reduxForm({form: 'saveRequest'})(RequestForm) */

export default MySearch;

