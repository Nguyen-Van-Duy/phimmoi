import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import BannerItem from "./BannerItem";
import NextArrow from './NextArrow';
import PrevArrow from "./PrevArrow";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const Banner = ({category}) => {

  const data = useSelector(state => state.datafilm.dataMovie.movie_now_play)
  const dataMovies = useSelector(state => state.datafilm.dataMovie.movie_trending_day)
  const dataTvs = useSelector(state => state.datafilm.dataTv.tv_trending_day)

  const params = useParams()


    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 0,
        // onSwipe: true,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // useEffect(() => {
    //   const fetch = async () => {
    //     const result = await dataMovie('movie', 'now_playing')
    //     setData(result);
    //     console.log(result)
    //   }
    //   fetch()
    // }, [])

  return (
    <section className="banner">
      <div>
        {!params.category && <Slider {...settings}>
          {(data.length > 0 ? data : Array.from(new Array(4))).map((item, index) => <BannerItem key={index} category={category} item={item}/>)}
        </Slider>}
        {params.category === 'movie' && <Slider {...settings}>
          {(data.length > 0 ? dataMovies : Array.from(new Array(4))).map((item, index) => <BannerItem key={index} category={category} item={item}/>)}
        </Slider>}
        {category === 'tv' && <Slider {...settings}>
          {(data.length > 0 ? dataTvs : Array.from(new Array(4))).map((item, index) => <BannerItem key={index} category={category} item={item}/>)}
        </Slider>}
      </div>

    </section>
  );
};

export default Banner;
