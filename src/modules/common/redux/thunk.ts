// import { Action } from 'redux';
// import { ThunkAction } from 'redux-thunk';
// import { AppState } from '../../../redux/reducer';
// import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
// import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
// import Cookies from 'js-cookie';

// export function fetchThunk(
//   url: string,
//   method: 'get' | 'post' | 'delete' | 'put' = 'get',
//   body?: object | FormData,
//   auth = true,
//   contentType?: string,
// ): ThunkAction<Promise<any>, AppState, null, Action<string>> {
//   return async (dispatch, getState) => {
//     const res = await fetch(url, {
//       credentials: 'include',
//       method,
//       body: typeof body === 'object' ? JSON.stringify(body) : body,
//       headers:
//         contentType !== 'multipart/form-data'
//           ? {
//             'Content-Type': contentType || 'application/json',
//             Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
//           }
//           : { Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '' },
//       cache: 'no-store',
//     });

//     const json = await res.json();

//     if (res.status === RESPONSE_STATUS_UNAUTHORIZED) {
//       // dispatch logout, remove access token here.
//     }

//     return json;
//     // throw new Error('Error');
//   };
// }

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import axios from 'axios';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const headers: any = contentType !== 'multipart/form-data' ?
      {
        'Content-Type': contentType || 'application/json',
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` || '',
      } :
      {
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` || '',
      }
    const config = {
      credentials: 'include',
      method,
      url,
      data: typeof body === 'object' ? JSON.stringify(body) : body,
      headers,
      cache: 'no-store',
    }
    const response = await axios(config)
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
        throw error
      });
    return response
  };
}
