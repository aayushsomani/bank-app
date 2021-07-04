// helper function for de bouncing 
export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number,
): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}

let timeToLeave = parseInt(process.env.REACT_APP_CACHE_TTL ? process.env.REACT_APP_CACHE_TTL : "600000");

// helper function to store/cache data in local storage and time to live along with it
export function setItemInLocalStorageWithExpiry(key: string, value: any, ttl: number = timeToLeave) {
    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

// helper function to retrieve data from local storage
export function getItemFromLocalStorageWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}