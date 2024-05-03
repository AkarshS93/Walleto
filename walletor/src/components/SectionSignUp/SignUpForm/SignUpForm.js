import React, {useState} from 'react'
import styles from './signUpForm.module.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    
    const initialData = {
        username: '',
        email: '',
        password: ''
    };

    const [data, setData] = useState(initialData);
    const {email, password, username} = data
    const navigate = useNavigate();
    // const url = process.env.BASE_URL
    // console.log(url);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const checkUser = async () => {
            try {
                const responce = await axios.get(`http://localhost:5050/api/users/${email}`)
                return responce.status === 200
            } catch (error) {
                if(error.responce && error.responce.status === 404){
                    return false
                } else {
                    console.error('Error checking user', error)
                    return false
                }
            }
    };
                

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(email && username && password){
            try {
                // Check if the user exists
                const userExists = await checkUser();
                if (userExists) {
                    alert('User already exists in the database');
                } else {
                    // If user does not exist, create a new user
                    const newUser = { email, username, password };
                    const response = await axios.post(`http://localhost:5050/api/users`, newUser);
                    console.log(response.data);
                    // Optionally, you can redirect the user to another page after successful signup
                     navigate('/login');
                }
            } catch (error) {
                console.log(error);
                alert('Error occurred while checking user or creating user');
            }
        } else{
            alert("Please enter all three values")
        }
    }

  return (
    <div className={styles.formbox}>
        <div className={styles.form}>
            <form onSubmit = {handleSubmit}>
                <div className={styles.elements}>
                    <label> User Name </label>
                    <input type='text' name='username' value={username} onChange={(e) => handleChange(e)}/>
                </div>
                <div className={styles.elements}>
                    <label> Email </label>
                    <input type='email' name='email' value={email} onChange={(e) => handleChange(e)}/>
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

export default SignUpForm