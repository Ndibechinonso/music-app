import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import './DataLoad.css'
import {fetchUsers} from '../../redux'
import { Link } from 'react-router-dom'
import DotRing from '../DotRing/DotRing'
import { MouseContext } from '../../context/mouse-context'


const DataLoad = (props) => {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);
    const loader = useSelector(state => state.userData.loading)
    const data = useSelector(state => state.userData.data)
    const error = useSelector(state => state.userData.error)
   
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
    <div>
<DotRing />
<div
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
        >
    <div className='playDiv'> {data.length !== 0 && error.length === 0 ? <div className='playCircleActing'><Link to='/home'><a><i className="fas play fa-play"></i></a></Link></div> : <div className='playCircle'><div className="hourglass"></div></div>} </div>
    </div>
    </div>
)

}

export default DataLoad;