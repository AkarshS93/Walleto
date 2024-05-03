import React from 'react'
import styles from './user.module.scss'
import { LocalStorage, LocalStorageKeys } from '../../utils'

const Users = () => {
    const userName = LocalStorage.getItems(LocalStorageKeys.userName)
    const email = LocalStorage.getItems(LocalStorageKeys.email)

    String.prototype.toSentenceCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
    return (
        <div>
            <div className={styles.wrap}>
                <p>First Name: </p>
                <p> {userName.toSentenceCase()}</p>
            </div>
            <div className={styles.wrap}>
                <p>Join on: </p>
                <p> 11/09/23</p>
            </div>
            <div className={styles.wrap}>
                <p>Email Id: </p>
                <p> {email}</p>
            </div>
            <div className={styles.wrap}>
                <p>Subscription: </p>
                <p> Yes</p>
            </div>
        </div>
    )
}

export default Users