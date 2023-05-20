
const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/journeys');
    const jsonData = await response.json()
    return jsonData
}

export default {
    getAll
}