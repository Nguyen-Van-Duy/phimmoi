import React from "react";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../API/configApi";
import { handleShowProfileCast } from "../../store/profileCastSlice";
import "./PaticipantItem.css";

const PaticipantItem = ({ item }) => {

  const dispatch = useDispatch()
  const showProfileCast = useSelector(state => state.profileCast.isShowProfile)

  const showProfile = () => {
    dispatch(handleShowProfileCast.handleShowProfile(!showProfileCast))
    dispatch(handleShowProfileCast.handleCastId(item.id))
  }

  return (
    <>
    <div className="content-item" onClick={showProfile}>
      <div className="content-item__link">
        <div className="content-item__content paticipant-content">
          <div className="paticipant-img">
              <img src={item.profile_path ? apiConfig.w200Image(item.profile_path) : apiConfig.backupPhoto} alt={item.name} title={item.name} />
          </div>
          <div className="paticipant-info">
              <p>{item.name}</p>
              <span className="paticipant-info__desc">{item.character}</span>
          </div>
        </div>
      </div>
      {/* <span className="button blue paticipant-button">
        <i className="fas fa-play-circle"></i>More info
      </span> */}
    </div>
    </>
  );
};

export default PaticipantItem;
