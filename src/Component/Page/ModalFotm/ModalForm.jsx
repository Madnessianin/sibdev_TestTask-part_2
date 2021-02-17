import { Button, Input, Select, Form, Slider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'

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
        <Form {...layout} className="request_form" 
                          name="save_request" 
                          onFinish = {props.onSubmit}>
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
            <Form.Item name="max_result" label="Максимум">
                <Slider  min={1} max={50} onChange={onChange} value={inputValue} />
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

const ModalForm = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(props.visibleMode);

    useEffect(()=>{
        setIsModalVisible(props.visibleMode)
    }, [props.visibleMode])

    return (
        <Modal title="Сохранить запрос" 
                   visible={isModalVisible}
                   centered 
                   footer={null}>
                
                <RequestForm onSubmit={props.onSubmit}  
                             onCancel={()=>{setIsModalVisible(false)}}
                             textRequest={props.textRequest} />
                
        </Modal>
    )
}

export default ModalForm;