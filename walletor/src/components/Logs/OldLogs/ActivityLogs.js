import React, { useState,useEffect, useContext } from 'react'
import styles from './activityLogs.module.scss'
import { LocalStorage, LocalStorageKeys } from '../../../utils'
import axios from 'axios'
import { LocalContext } from '../../../utils/context'
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const ActivityLogs = ({load}) => { 

    const userId = LocalStorage.getItems(LocalStorageKeys.user_Id)

    const [data, setData] = useState([])
    const [loadData, setLoadData] = useState(false)
    const [editDescStart, setEditDescStart] = useState(false)
    const [editAmountStart, setEditAmountStart] = useState(false)
    const [editIndex, setEditIndex] = useState(-1)

    const [editDescData, setEditDescData] = useState('')
    const [editAmountData, setEditAmountData] = useState('')

    const {setBalance} = useContext(LocalContext)
    const [sortData, setSortData] = useState([])
    const [reduceArray, setReduceArray] = useState()
    const [reduceArrayIndex, setReduceArrayIndex] = useState(0)
    const [editDesc, setEditDesc] = useState(Array(data.length).fill(false));
    const [editAmount, setEditAmount] = useState(Array(data.length).fill(false));

    const paginationArray = (array) => {
        const newArray = array.reduce((value, array, index) => {
            index % 6 === 0 && value.push([])
            value[value.length - 1].push(array)
            return value
        }, [])
        return newArray
    }

    const fetchActivity = async () => {
        try {
            const resp = await axios.get(`http://localhost:5050/api/activities/${userId}`);
            const tableData = resp.data.reverse();
            //console.log(tableData);
            setData(tableData);
            setReduceArray(paginationArray(tableData));
            setSortData(tableData);
            setBalance(tableData.reduce((acc, curr) => acc + curr.amount, 0));
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    };

    const editActivity = async (description, amount, objectId) =>{
        const data = {
            "amount": editAmountData ? editAmountData : amount,
            "description" : editDescData ? editDescData : description
        }
        try {
            const resp = await axios.patch(`http://localhost:5050/api/activities/${objectId}`, data)
            console.log('resp', resp);
            const res = await resp.data
            if (resp.status === 200){
                setLoadData(true)
            }
            setTimeout(() => setLoadData(false), 1000)
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    }

    const handleSort = (e) =>{
        const val = e.target.value
        switch(val){
            case "High Amount":
                setReduceArray(paginationArray(data.slice().sort((a, b) => b.amount - a.amount > 0 ? 1 : -1)))
                break
            case "Low Amount":
                setReduceArray(paginationArray(data.slice().sort((a, b) => a.amount - b.amount > 0 ? 1 : -1)))
                break;
            case "Most Recent":
                setReduceArray(paginationArray(data))
                break;
        }
    }

    const handleEdit = (index, description, amount) => {
        setEditIndex(-1)
        setEditIndex(index)
        setEditAmountData('')
        setEditDescData('')
        const newEditDesc = [...editDesc];
        const newEditAmount = [...editAmount]
        newEditDesc[index] = true;
        newEditAmount[index] = true
        setEditDesc(newEditDesc);
        setEditAmount(newEditAmount)
    };
    
    const handleSave = (index, description, amount, objectId) => {
        // Handle save logic here
        const newEditStates = [...editDesc];
        const newEditAmount = [...editAmount]
        newEditStates[index] = false;
        newEditAmount[index] = false
        setEditDescStart(false)
        setEditAmountStart(false)
        setEditIndex(-1)
        setEditDesc(newEditStates);
        setEditAmount(newEditAmount)
        editActivity(description, amount, objectId)
    };

    const handleClose = () =>{
        setEditIndex(-1)
    }
     // console.log(data, balance);
    useEffect(() =>{
        fetchActivity()
        setReduceArrayIndex(0)
    }, [load, loadData])
    //console.log(loadData);
    //console.log(editAmountData, editDescData);
  return (
    <div className={styles.container}>
        <h2>Your Recent Activities</h2>
        <div className={styles.init}> 
            <p> Initial Amount: 50000</p>
        </div>
        {data.length > 0 ? <div>
        <div className={styles.selector}>
            <select onChange={(e) => handleSort(e)}>
                <option id='mr'>Most Recent</option>
                <option id = 'ha'>High Amount</option>
                <option id='la'>Low Amount</option>
            </select>
        </div>
        <div style={{ minHeight: '85px'}}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th> S. No.</th>
                    <th> Date</th>
                    <th> Time</th>
                    <th> Activity</th>
                    <th> Spent Amount</th>
                </tr>
            </thead>
            <tbody>
            {reduceArray.length > 0 && reduceArray[reduceArrayIndex].slice().map((item, id) =>{
                const {amount, date, time, description, _id} = item
                const objectId = _id
                return(
                    <tr key={id }>
                        <td> {id+1}</td>
                        <td> {date}</td>
                        <td> {time}</td>
                        <td> {editIndex === id && editDesc[id] ? <input value={editDescStart ? editDescData : description} type='text' style={{width: '130px'}} onChange={(e) => {
                            setEditDescStart(true) 
                            setEditDescData(e.target.value)}}/> : description}</td>
                        <td> {editIndex === id && editAmount[id] ? <input value={editAmountStart ? editAmountData : amount} type='number' style={{width: '90px'}} onChange={(e) =>{
                            setEditAmountStart(true)
                            setEditAmountData(e.target.value)}}/> : amount}</td>
                        <td className={styles.modifide}> 
                            {editIndex === id ? 
                                <div>
                                <span onClick={() => handleSave(id, description, amount, objectId)} className={styles.ok}>
                                    <FaCheck />
                                </span>
                                <span onClick={handleClose} className={styles.ok}>
                                    <RxCross2 fontWeight={500}/>
                                </span>
                                </div>
                                 : <span onClick={() => handleEdit(id)} className={styles.edit}>
                            <FiEdit />
                        </span>
                            }
                         </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
        <div className={styles.pgwrap}>
            {reduceArray.map((_, id) => {
                return <span key={id} className= {`${styles.pg} ${id === reduceArrayIndex ? styles.activeIndex : ''}`} onClick={() => setReduceArrayIndex(id)}> {id} </span>
            })}
        </div>
        </div> : <div> <p> No entry found</p> </div>}
    </div>
  )
}

export default ActivityLogs