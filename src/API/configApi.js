const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    urlConnect: process.env.REACT_APP_CONNECT_SERVER,
    urlConnectSocketIO: process.env.REACT_APP_CONNECT_SOCKETIO,
    apiKey: process.env.REACT_APP_KEY,
    background: 'https://1.bp.blogspot.com/-aU-WA2rtcMM/Xo8nNMI-Y8I/AAAAAAAAb50/dcqECod409IxSklnP_cuELke_iHQnWobgCLcBGAsYHQ/s1600/Anh-gai-xinh-deo-kinh-2k%2B%252880%2529.jpg',
    backupPhoto: 'https://1.bp.blogspot.com/-taNL4-qb6UA/XoBShx5H8mI/AAAAAAAAabY/dIHUXHJUJZ4VrDTbdGNnCbPAOY50vCCcwCLcBGAsYHQ/s1600/Hinh-anh-con-gai-cute-de-thuong%2B%25285%2529.jpg',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
    w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
    embedMovie: (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`,
    embedEpisode: (id, season = 1, episode = 1) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`,
};

export default apiConfig;
