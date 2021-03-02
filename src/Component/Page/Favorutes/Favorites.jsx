import { Button, List } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ModalForm from "../ModalFotm/ModalForm";
import "./Favorites.css";

const Favorites = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestValue, setRequestValue] = useState({});

  const onSubmit = (request) => {
    props.changeRequest(requestValue.id, request);
    setIsModalVisible(false);
  };

  return (
    <div className="favorites">
      <List
        bordered
        size="large"
        dataSource={props.favoritesRequest}
        renderItem={(item) => (
          <List.Item
            actions={[
              <NavLink
                onClick={() => {
                  setRequestValue(item);
                  props.getSearchVideo(
                    item.request,
                    item.max_result,
                    item.sort
                  );
                }}
                to="/page/search"
              >
                Выполнить
              </NavLink>,
              <Button
                onClick={() => {
                  setIsModalVisible(true);
                  setRequestValue(item);
                }}
              >
                Редактировать
              </Button>,
            ]}
          >
            {item.nameRequest}
          </List.Item>
        )}
      />
      <ModalForm
        onSubmit={onSubmit}
        title={"Изменить "}
        visibleMode={isModalVisible}
        initialValue={requestValue}
        isDisabled={false}
      />
    </div>
  );
};

export default Favorites;
