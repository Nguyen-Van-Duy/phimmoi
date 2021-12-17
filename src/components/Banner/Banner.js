import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import BannerItem from "./BannerItem";
import NextArrow from './NextArrow';
import PrevArrow from "./PrevArrow";
import { useSelector } from "react-redux";


const Banner = () => {

  const data = useSelector(state => state.datafilm.dataMovie.movie_now_play)

  // if(!data) return "loading...";

  // const [data, setData] = useState([])

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
        <Slider {...settings}>
          {data.map((item, index) => <BannerItem key={index} item={item}/>)}
        </Slider>
      </div>

    </section>
  );
};

export default Banner;
