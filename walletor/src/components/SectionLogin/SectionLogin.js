import React from 'react'
import img from '../../static/img/login.jpg'
import styles from './sectionLogin.module.scss'
import LoginForm from './LoginForm/LoginForm'

const SectionLogin = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.img}>
          <img src={img} alt='login image'/>
        </div>
        <div>
            <LoginForm />
        </div>
      </div>
  )
}

export default SectionLogin