
const setItems = (key, value) =>{
    const isBrowser = typeof window !== 'undefined'
    if(isBrowser){
        window.localStorage.setItem(key, value)
    }
}

const getItems = (key) =>{
    const isBrowser = typeof window !== 'undefined'
    if(!isBrowser) return null
    try {
        const item = window.localStorage.getItem(key)
        return item
    } catch (error) {
        console.log(error)
    }
}

const remove = (key) =>{
    const isBrowser = typeof window  !== 'undefined' 
    if(isBrowser){
        window.localStorage.removeItem(key)
    }
}

export const LocalStorage = {
    setItems,
    getItems,
    remove
}