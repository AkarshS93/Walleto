// import React, { useEffect } from 'react';
// //import { useNavigate  } from 'react-router-dom';
// import RedirectToLogin from '../../RedirectToLogin/RedirectToLogin';
// import { LocalStorage, LocalStorageKeys } from '../../../utils';

// const withAuth = (WrappedComponent) =>{
    
//     const AuthWrapper = (props) =>{
        
//         const token = LocalStorage.getItems(LocalStorageKeys.token)
//         return (
//               token ? <WrappedComponent {...props}/> : <RedirectToLogin />
//         )
//     }
//     return AuthWrapper
// }

// export default withAuth;
