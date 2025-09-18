import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';


const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const addNew = (personData) => {
    return axios.post(baseUrl, personData)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

export default {getAll, addNew, deletePerson}