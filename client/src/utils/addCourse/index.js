import { apiUrl, tokenKey } from "../config"

export const addCourse = (courseName) => {
    console.log('here', courseName)
    const url = `${apiUrl}/tutor/courses`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${localStorage.getItem(tokenKey)}`
        },
        body: JSON.stringify({ courseName: courseName }),
    }

    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(url, options).then(res => res.json())
            if (!data) return reject(null)
            resolve(data)

        } catch (error) {
            console.error(error)
            reject(null)
        }
    })
}