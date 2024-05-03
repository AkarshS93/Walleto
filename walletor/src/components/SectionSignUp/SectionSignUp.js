import React from 'react'
import img from '../../static/img/login.jpg'
import styles from './sectionSignUp.module.scss'
import SignUpForm from './SignUpForm/SignUpForm'

const SectionSignUp = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.img}>
          <img src={img} alt='login image'/>
        </div>
        <div>
            <SignUpForm />
        </div>
      </div>
  )
}

export default SectionSignUp