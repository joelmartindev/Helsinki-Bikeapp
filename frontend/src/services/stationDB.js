const getAll = async () => {
    const response = await fetch('http://localhost:3000/stations');
    const jsonData = await response.json()
    return jsonData
}

export default {
    getAll
}