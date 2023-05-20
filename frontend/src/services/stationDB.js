const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/stations');
    const jsonData = await response.json()
    return jsonData
}

const getTotalJourneys = async (id) => {
    const response = await fetch(`http://localhost:3000/api/stations/${id}/journeys`);
    const jsonData = await response.json()
    return jsonData
}

export default {
    getAll,
    getTotalJourneys
}