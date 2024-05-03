import React, { useContext, useEffect } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LocalContext } from "../../../utils/context";
import { LocalStorage, LocalStorageKeys } from "../../../utils";

const Header = () => {
  const {logStatus, setLogStatus,balance} = useContext(LocalContext)
  const token  = LocalStorage.getItems(LocalStorageKeys.token)
  const username = LocalStorage.getItems(LocalStorageKeys.userName)
// console.log('username', username);
  //console.log(token);
  useEffect(() =>{
    if(token === null){
      setLogStatus(false)
    } else setLogStatus(true)
  }, [token])

  String.prototype.toSentenceCase= function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
  }
  const handleLogout = () => {
    // Update the log status when logout link is clicked
    localStorage.clear()
    setLogStatus(false);
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>Walletory</div>
      {logStatus ? (
        <div className={styles.wrap}>
          <div>
          <Link to="/">
            <div>Activity Logs</div>
          </Link>
          </div>
          <div className={styles.user}>
            <div >
              Hi {username.toSentenceCase()}
            </div>
            <div className={styles.logout}>
              <Link to="/user"> Profile </Link>
              <Link to='/login' onClick={handleLogout}>
                Logout 
              </Link>
            </div>
          </div>
          <div className={styles.balance}>
            <RiMoneyRupeeCircleLine fontSize="1.5rem" /> <span> {Number(50000) - balance}</span>
          </div>
        </div>
      ) : (
        <div className={styles.wraptwo}>
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/signup">
            <div> Sign Up</div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
