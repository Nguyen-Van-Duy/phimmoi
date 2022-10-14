import React, { useCallback, useEffect, useState } from 'react'
import { DatePicker, Space, Input, Result } from 'antd';
import "./History.css"
import axios from 'axios';
import apiConfig, { success } from '../../../API/configApi';
import { useSelector } from 'react-redux';
import {movieDetails, movieShareDetails } from '../../../API/MoviesApi';
import { Image } from 'antd';
import Loading from '../../Loading';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function History() {
    // const [listMovie, setListMovie] = useState([])
    const [movie, setMovie] = useState([])
    const [movieDefault, setMovieDefault] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [listChecked, setListchecked] = useState([])
    const dataUser = useSelector(state=>state.loginSlice.dataUser)
    const [isLoading, setIsLoading] = useState(true)
    const [valueSearchName, setValueSearchName] = useState("")
    const [valueDate, setValueDate] = useState("")

    const handleDate = (time) => {
        const date = new Date(time)
        const day = time.slice(0, 10)
        const h = date.getHours()
        const m = date.getMinutes()
        const s = date.getSeconds()
        return day + ' ' + h + ":" + m + ":" + s
    }

      const getListFavourite = useCallback(async (data) => {
        let listFavourite = []
        data.map(async (item)=> {
            if(Number(item.movie_id)) {
                const result = await movieDetails(item.category, Number(item.movie_id))
                await listFavourite.push({...result, history_id: item._id, createdAt: handleDate(item.createdAt), isCheck:false, category: item.category})
            } else {
                const result = await movieShareDetails(item.movie_id)
                await listFavourite.push({...result[0], history_id: item._id, createdAt: handleDate(item.createdAt), isCheck:false, category: item.category})
            }
            setMovie([...listFavourite].reverse())
            setMovieDefault([...listFavourite].reverse())
            setIsLoading(false)
        })
    }, [])

    console.log(dataUser);

      useEffect(()=> {
        const getDataHistory = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/movie-history/" + dataUser._id)
            console.log(data);
            // setListMovie(data.data)
            if(data.data.length > 0) {
                getListFavourite(data.data)
                // setIsLoading(false)
            }
            setIsLoading(false)
        }
        getDataHistory()
      }, [dataUser._id, getListFavourite])

      useEffect(()=> {
        if(listChecked.length === movie.length) {
            setIsCheckAll(true)
        } else {
            setIsCheckAll(false)
        }
      }, [listChecked, movie])

      const handleCheckbox = (item)=> {
          item.isCheck=!item.isCheck;
          const result = listChecked.findIndex(data=> (data.id === item.id && data.createdAt === item.createdAt))
          if(result !== -1) {
            const unChecked = listChecked.filter(data=> 
                !(data.id === item.id && data.createdAt === item.createdAt)
            )
            setListchecked(unChecked)
          } else {
            setListchecked(d=> [...d, item])
          }
        }
        
        const handleDeleteHistory = async () => {
            const listIdChecked = listChecked.map(item=>item.history_id)
            const params = {list_id: listIdChecked, userId: dataUser._id}
            const resultDelete = await axios.post(apiConfig.urlConnect + "movie/delete-history", params)
            if(resultDelete.data.length > 0) {
                getListFavourite(resultDelete.data)
                success("Delete successfully!")
            } else {
                setMovie([])
                setMovieDefault([])
            }
            setListchecked([])
        }

        const handleCheckAll = () => {
            setIsCheckAll(!isCheckAll)
            const newMovie = []
             movie.forEach(item => newMovie.push({...item, isCheck: !isCheckAll}))
            setMovie(newMovie);
            // setMovieDefault(newMovie);
            if(!isCheckAll) {
                setListchecked(newMovie);
            } else {
                setListchecked([]);
            }
        }

        const handlerSearchName = (value) => {
            console.log(typeof value, typeof valueDate);
            console.log( value,  valueDate);
            setValueSearchName(value || "");
            if(value === "" && valueDate === "") {
                setMovie(movieDefault)
            }
            else if(value === "" && valueDate !== "") {
                const newData = movieDefault.filter(item=>item.createdAt.slice(0, 7) === valueDate)
                setMovie(newData)
            } else if (value !== "" && valueDate !== "") {
                const results = movie.filter(item=>
                    ((item.name || item.title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').includes((value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'))))
                setMovie(results);
            } else if(value !== "" && valueDate === "") {
                const results = movieDefault.filter(item=>
                    ((item.name || item.title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').includes((value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'))))
                setMovie(results);
            }
        }

        const handleFilterDate = (date, dateString) => {
            console.log(dateString);
            setValueDate(dateString || "")
            if(dateString === "" && valueSearchName === "") {
                setMovie(movieDefault)
            }
            else if(dateString === "" && valueSearchName !== "") {
                const results = movieDefault.filter(item=>
                    ((item.name || item.title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').includes((valueSearchName).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'))))
                setMovie(results);
            }
            // console.log("2022-08-22".slice(0, 7));
            else if(dateString !== "" && valueSearchName !== "") {
                const newData = movie.filter(item=>item.createdAt.slice(0, 7) === dateString)
                setMovie(newData)
            } else {
                const newData = movieDefault.filter(item=>item.createdAt.slice(0, 7) === dateString)
                setMovie(newData)
            }
          };

          console.log(movie);
        

  return (
    <div className='profile'>
        <h2 className='profile_title'>History</h2>
        {isLoading && <div className="manager-loading loading"><Loading /></div>}
        {!isLoading && <> <Space direction="vertical">
            <div className='history__container'>
                <div className='history__filter'>
                    <DatePicker onChange={handleFilterDate} picker="month" className='history__time' />
                    <Input className='history__search' placeholder="Enter movie name" allowClear onChange={(e=>handlerSearchName(e.target.value))} />
                </div>
                {listChecked.length > 0 && <span className='button red history__button' onClick={handleDeleteHistory}>Delete</span>}
            </div>
        </Space>
        {!isLoading && <table className='history__list'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Genres</th>
                    <th>Time</th>
                    <th>All <input type="checkbox" className='history__checkbox' checked={isCheckAll} onChange={handleCheckAll} /> </th>
                </tr>
            </thead>
            <tbody>
                {movie && movie.length > 0 && movie.map((item, id)=>
                <tr className='history__item' key={id}>
                    <td className='history__center'>
                        {item.id ? <Image src={(item.backdrop_path || item.poster_path ? apiConfig.originalImage(item.backdrop_path || item.poster_path) : apiConfig.backupPhoto)}  alt="" /> :
                        <Image src={(apiConfig.urlConnectSocketIO + item.backdrop_path)}  alt="" />}
                    </td>
                    <td className='history__content-name'>
                        <Link to={`/${item.category}/${item.id || item._id}`}>
                            {item.title || item.name}
                        </Link>
                    </td>
                    <td className='history__content-genres'>
                        {item.genres && item.genres.map((genres, genresId)=> <span key={genresId}>{genres.name || genres.key}, </span>)}
                    </td>
                    <td className='history__time'>{item.createdAt}</td>
                    <td>
                        <input type="checkbox" className='history__checkbox' name={id} checked={item.isCheck} onChange={()=>handleCheckbox(item)}/> 
                    </td>
                </tr>)}

            </tbody>
        </table>}
        {!isLoading && movie.length <= 0 && <Result
                    icon={<SmileOutlined />}
                    title="No Data!"
                />}
        </>}
    </div>
  )
}

export default History