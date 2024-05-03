import React, {useState} from 'react'
import styles from './activityForm.module.scss'
import axios from 'axios'
import { LocalStorage, LocalStorageKeys } from '../../utils'
const initialData = {
    amount: '',
    description: ''
}

const ActivityForm = ({setLoad}) => {

    const [data, setData] = useState(initialData)

    const {amount, description} = data

    const token = LocalStorage.getItems(LocalStorageKeys.token)
    const userId = LocalStorage.getItems(LocalStorageKeys.user_Id)

    // Create a new Date object
    const now = new Date();

    // Get the current date
    const day = String(now.getDate()).padStart(2, '0'); // Get day with leading zero if needed
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so we add 1
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')

    // Format the date and time
    const date = `${day}-${month}-${year}`;
    const time = `${hours}:${min}`
 
    const handleChange = (e) =>{
        const {name, value} = e.target
        setData({...data, [name] : value})
        // console.log(data);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!amount && !description) {
            alert('Please enter both details')
        }
        try {
            const resp = await axios.post('http://localhost:5050/api/activities' ,
            {
                userId,
                amount,
                description,
                date,
                time
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`
                }
            }
        )
        setLoad(true)
        setTimeout(() => setLoad(false), 1000)
        setData(initialData)
        console.log(resp);

        } catch (error) {
            console.error('Error:', error.response.data); 
        }
    }
  return (
    <div className={styles.box}>
        <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className={styles.item}>
                <label> Description</label>
                <textarea rows={2} type='textarea' required name='description' value={description} onChange={handleChange}/>
            </div>
            <div  className={styles.item}>
                <label> Spent Amount</label>
                <input type='number' required name = 'amount' value={amount} onChange={handleChange}/>
            </div>
            <div className={styles.btnwrap}>
                <button type='submit' className={styles.btn}> Submit</button>
            </div>
        </form>
    </div>
  )
}

export default ActivityForm