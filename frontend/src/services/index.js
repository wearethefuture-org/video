import config from '../config/config'
import axios from 'axios'

export const getEventLists = () => {
  return new Promise((resolve, reject) => {
    axios.request({
      url: `/getEvents`,
      baseURL: config.apiBaseUrl,
      method: 'get',
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

export const getToken = (username, roomName) => {
  return new Promise((resolve, reject) => {
    axios.request({
      url: `/getToken`,
      baseURL: config.apiBaseUrl,
      method: 'post',
      data: {
        identity: username,
        room: roomName
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res, rej) => {
      resolve(res.data);
      reject(rej.data);
    }).catch((err) => {
      console.log(err.response);
      // reject(err);
    })
  })
}

export const getEventsMembers = (eventId) => {
  return new Promise((resolve, reject) => {
    axios.request({
      url: `/getEventMemners/${eventId}`,
      baseURL: config.apiBaseUrl,
      method: 'get',
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}