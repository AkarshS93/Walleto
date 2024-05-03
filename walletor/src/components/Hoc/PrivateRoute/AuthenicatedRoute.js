import { useNavigate  } from 'react-router-dom';
import { LocalStorage, LocalStorageKeys } from '../../../utils';
import { useEffect } from 'react';

const AuthenticatedRoute = ({ children}) => {
    const navigate = useNavigate()
    let token = LocalStorage.getItems(LocalStorageKeys.token)

    useEffect(() =>{
        if(token === null){
            navigate('/login')
        }
    }, [token])
    
    return children
}

  export default AuthenticatedRoute