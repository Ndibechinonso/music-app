// // import React, { useState, useEffect } from 'react'

// // import {connect} from 'react-redux'
// // import {fetchUsers} from '.././redux'


// // const RouteGuard = (props) => {

// //     const {fetchUsers, userData} = props
// //     useEffect(() => {
     
// //            console.log(userData)
// //            const userr = userData[1]
// //            {userData &&
// //            console.log(userData[0], '1')
// //            console.log(userr, '2')
// //            // console.log(userData[2].data, '3')
// //            // console.log(userData[3].data, '4')
// //        }
// //        },[]
// //        )
// //     return (
// //         <div>
// //             {props.children}
// //         </div>
// //     );
// // };

// // const mapStateToProps = state =>{
// //     return{
// //         userData: state.data
// //     }
// // }

// // const mapDispatchToProps = dispatch => {
// //     return{
// //         fetchUsers: ()=> dispatch(fetchUsers())
// //     }
// // }

// // export default connect(mapStateToProps, mapDispatchToProps)(RouteGuard);
// import React, { useState, useEffect } from 'react'
// import {useDispatch} from 'react-redux'
// import {fetchUsers} from '.././redux'
// import Routes from '../routes'
// import { useLocation } from 'react-router-dom';

// const RouteGuard = () => {
//     const location = useLocation();
//     const dispatch = useDispatch()
//     useEffect(()=>{
//         dispatch(fetchUsers())
//     },[])
   

//     useEffect(() => {
//         const searchParams = new URLSearchParams(location.search);
//         const code = searchParams.get('code')
//         console.log(code)
//         localStorage.setItem('code', code)
//     }, []);
//     return (
//         <div>
       
//       <Routes />      
//         </div>
//     );
// };

// export default RouteGuard;