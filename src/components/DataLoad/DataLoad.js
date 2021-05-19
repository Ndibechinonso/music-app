import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import './DataLoad.css'
import {fetchUsers} from '../../redux'
import { Link } from 'react-router-dom'



const DataLoad = (props) => {

    const loader = useSelector(state => state.loading)
    const data = useSelector(state => state.data)
    const error = useSelector(state => state.error)
    const fetchedData = useSelector(state => state.data[1])
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(fetchUsers())
     
    },[])

    const location = useLocation();

useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code')
    localStorage.setItem('code', code)
}, []);

return(
    <div className='playDiv'> {data.length !== 0 && error.length === 0 ? <div className='playCircleActing'><Link to='/home'><a><i className="fas play fa-play"></i></a></Link></div> : <div className='playCircle'><div class="hourglass"></div></div>} </div>
)



}

export default DataLoad;