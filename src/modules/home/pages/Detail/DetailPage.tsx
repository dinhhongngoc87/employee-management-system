import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import ReactCrop from 'react-image-crop';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';
import { API_PATHS } from '../../../../configs/api';
import { ROUTES } from '../../../../configs/routes';
import { AppState } from '../../../../redux/reducer';
import { ACCESS_TOKEN_KEY, APIUrl } from '../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { logout, setUserInfo } from '../../../auth/redux/authReducer';
import { fetchThunk } from '../../../common/redux/thunk';
import './DetailPage.css';
import 'react-image-crop/dist/ReactCrop.css';
import { generateAvatarUpload } from '../../../../utils/upload';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';

const DetailPage = () => {
  // const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // const location = useLocation();
  // const { user } = useSelector((state: AppState) => state.profile);
  // const avatarInputRef = useRef<HTMLInputElement>(null);
  // const imgRef = useRef<any>(null);
  // const [image, setImage] = useState(user?.avatar);
  // const [openModal, setOpenModal] = useState(false);
  // const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 1 });
  // const [completedCrop, setCompletedCrop] = useState<any>(null);
  // const previewCanvasRef = useRef<any>(null);

  // const getUserProfile = async () => {
  //   if (location.pathname === ROUTES.profile) {
  //     const json = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));
  //     if (json?.code === RESPONSE_STATUS_SUCCESS) {
  //       dispatch(setUserInfo(json.data));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  // const changeAvatar = () => {
  //   if (avatarInputRef.current !== null) avatarInputRef.current.click();
  // };

  // const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const files = e.target.files;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result as any);
  //   };
  //   if (files !== null && files.length) reader.readAsDataURL(files[0]);
  //   setOpenModal(true);
  // };

  // const onLoad = useCallback((img: any) => {
  //   imgRef.current = img;
  // }, []);

  // useEffect(() => {
  //   if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
  //     return;
  //   }

  //   const image = imgRef.current;
  //   const canvas = previewCanvasRef.current;
  //   const crop = completedCrop;

  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;
  //   const ctx = canvas.getContext('2d');
  //   const pixelRatio = window.devicePixelRatio;

  //   canvas.width = crop.width * pixelRatio * scaleX;
  //   canvas.height = crop.height * pixelRatio * scaleY;

  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = 'high';

  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //   );
  // }, [completedCrop]);

  // const uploadAvatar = async () => {
  //   const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop);
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file, file.name);
  //     const config = {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
  //       },
  //     };
  //     const json = await axios.put(API_PATHS.userProfile, formData, config);
  //     if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
  //       dispatch(setUserInfo(json.data.data));
  //     }
  //   }
  // };

  // const onLogout = () => {
  //   dispatch(logout());
  //   dispatch(replace(ROUTES.login));
  // };

  return (
    <div className="container">
      {/* <div className="card" style={{ margin: 'auto', width: '100%', alignItems: 'center' }}>
        <div className="profilepic">
          <img src={`${APIUrl}/${user?.avatar}`} className="card-img-top profilepic__image" alt="avatar_url" />
          {location.pathname === ROUTES.profile && (
            <div className="profilepic__content" onClick={changeAvatar}>
              <input ref={avatarInputRef} hidden type="file" onChange={onChooseAvatar} accept="image/*" />
              <span className="profilepic__text">Upload Avatar</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">{user?.email}</p>
          <h5 className="card-title">User Name</h5>
          <p className="card-text">{user?.name}</p>
          <h5 className="card-title">Description</h5>
          <p className="card-text">{user?.description}</p>
          <h5 className="card-title">State</h5>
          <p className="card-text">{user?.state}</p>
          <h5 className="card-title">Region</h5>
          <p className="card-text">{user?.region}</p>
          {location.pathname === ROUTES.profile && (
            <button className="btn btn-primary" onClick={onLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCrop
            src={image ? image : ''}
            crop={crop}
            onChange={(newCrop: any) => {
              console.log('====================================');
              console.log(newCrop);
              console.log('====================================');
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setOpenModal(false);
              uploadAvatar();
            }}
          >
            Save Image
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default DetailPage;
