export const saveItemLocalStorage = (key, data) => {
	return localStorage.setItem(key, JSON.stringify(data))
}

export const deleteItemLocalStorage = (key) => {
	return localStorage.removeItem(key)
}

export const getItemLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key))
}