import { Button, List } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Favorites.css'

const Favorites = (props) => {

    
    return (
        <div className="favorites">
            <List bordered
                  size="large"
                  dataSource={props.favoritesRequest}
                  renderItem={item => (
                    <List.Item actions={[
                        <NavLink onClick={()=>{
                                console.log("text")
                            }} to = '/page/search'>Выполнить</NavLink>, 
                        <Button>Редактировать</Button>]}>
                        {item.nameRequest}
                    </List.Item>
                  )} />
        </div>
    )
}


export default Favorites;

