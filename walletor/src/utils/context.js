import React, {useState} from "react";

export const LocalContext = React.createContext()

export function LocalProvider(props) {
    const [logStatus, setLogStatus] = useState(false)
    const [balance, setBalance] = useState(0)

    const values = {
        logStatus,
        setLogStatus,
        setBalance,
        balance
    }

    return (
        <LocalContext.Provider
            value={{ ...values }}>
            {props.children}
        </LocalContext.Provider>
    )
}