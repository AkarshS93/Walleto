import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss'
import axios from 'axios';
import { LocalContext } from '../../../utils/context';
import {LocalStorage, LocalStorageKeys} from '../../../utils'

const LoginForm = () => {

    const initialData = {
        email: '',
        password: ''
    };

    const [data, setData] = useState(initialData);
    const {email, password} = data
    const navigate = useNavigate();
    const {setLogStatus} = useContext(LocalContext)
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(email && password){
            try {
                const resp = await axios.post('http://localhost:5050/api/login', data)
                // console.log(resp);
                const {token, userId, userName, email} = resp.data
                LocalStorage.setItems(LocalStorageKeys.token, token)
                LocalStorage.setItems(LocalStorageKeys.user_Id , userId)
                LocalStorage.setItems(LocalStorageKeys.userName , userName)
                LocalStorage.setItems(LocalStorageKeys.email, email)
                setLogStatus(true)
                navigate('/')
            } catch (error) {
                console.log(error);
                alert('Error occurred while login user');
            }
        } else alert('Please fill id and password')
        // console.log(email, password)
        //
    }

  return (
    <div className={styles.formbox}>
        <div className={styles.form}>
            <form onSubmit = {handleSubmit}>
                <div className={styles.elements}>
                    <label> Email </label>
                    <input type='text' name='email' value={email} onChange={(e) => handleChange(e)}/>
                </div>
                <div className={styles.elements}>
                    <label> Password </label>
                    <input  type = 'password' name='password' value={password} onChange={(e) => handleChange(e)}/>
                </div>
                <div className={styles.btnContainer}>
                    <button type='submit' className={styles.btn}> Submit</button>
                    <p> Forget Password</p>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default LoginForm