const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: process.env.REACT_APP_KEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
    w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
    embedMovie: (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`,
    embedEpisode: (id, season, episode) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`,
};

export default apiConfig;
