import { Input } from "antd";
import React, { useEffect, useState } from "react";
import "./Search.css";
import VideoList from "./Video/VideoList";
import { HeartOutlined } from "@ant-design/icons";

import Preloader from "../../Common/Preloader/Preloader";
import ModalForm from "../ModalFotm/ModalForm";

const { Search } = Input;

const MySearch = (props) => {
  const [textRequest, setTextRequest] = useState(props.textRequest);

  useEffect(() => {
    setTextRequest(props.textRequest);
  }, [props.textRequest]);

  const onSearch = (text) => {
    props.getSearchVideo(text);
    setTextRequest(text);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const suffix = (
    <div
      onClick={() => {
        setIsModalVisible(true);
      }}
      className="search_inner_suffix"
    >
      <HeartOutlined style={{ fontSize: 16, color: "#1890ff" }} />
    </div>
  );

  const onSubmit = (data) => {
    props.saveRequest(data);
    setIsModalVisible(false);
  };

  return (
    <div className="search">
      <h1 className="search_title">Поиск видео</h1>
      <div className="search_inner">
        <Search
          placeholder={textRequest || "Что хотите посмотреть?"}
          enterButton="Найти"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
        />
      </div>
      {props.isFetching ? (
        <div className="preloader">
          <Preloader />
        </div>
      ) : null}
      {textRequest ? (
        <VideoList
          videos={props.result}
          textRequest={textRequest}
          totalCount={props.totalCount}
        />
      ) : null}
      <ModalForm
        onSubmit={onSubmit}
        title={"Сохранить "}
        textRequest={textRequest}
        visibleMode={isModalVisible}
        isDisabled={true}
        initialValue={{}}
      />
    </div>
  );
};

export default MySearch;
