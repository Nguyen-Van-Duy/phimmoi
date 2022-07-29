import { message } from 'antd';

export const success = (m) => {
  message.success(m);
};

export const error = (m) => {
  message.error(m);
};

export const warning = (m) => {
  message.warning(m);
};

export const handleDate = (time) => {
  const date = new Date(time)
  const day = time.slice(0, 10)
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return day + ' ' + h + ":" + m + ":" + s
}

const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    urlConnect: process.env.REACT_APP_CONNECT_SERVER,
    urlConnectSocketIO: process.env.REACT_APP_CONNECT_SOCKETIO,
    apiKey: process.env.REACT_APP_KEY,
    token: localStorage.getItem('token'),
    headers: { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} },
    background: 'https://1.bp.blogspot.com/-aU-WA2rtcMM/Xo8nNMI-Y8I/AAAAAAAAb50/dcqECod409IxSklnP_cuELke_iHQnWobgCLcBGAsYHQ/s1600/Anh-gai-xinh-deo-kinh-2k%2B%252880%2529.jpg',
    backupPhoto: 'https://1.bp.blogspot.com/-taNL4-qb6UA/XoBShx5H8mI/AAAAAAAAabY/dIHUXHJUJZ4VrDTbdGNnCbPAOY50vCCcwCLcBGAsYHQ/s1600/Hinh-anh-con-gai-cute-de-thuong%2B%25285%2529.jpg',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
    w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
    embedMovie: (id) => `https://2embed.org/embed/${id}`,
    embedEpisode: (id, season = 1, episode = 1) => ` https://2embed.org/embed/${id}/${season}/${episode}`,
    // embedMovie: (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`,
    // embedEpisode: (id, season = 1, episode = 1) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`,
};

export default apiConfig;
