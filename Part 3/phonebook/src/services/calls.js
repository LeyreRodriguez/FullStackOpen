import axios from 'axios'
const baseUrl = '/api/persons'


const create = newPerson => {
  const request =  axios.post(baseUrl, newPerson)
  return request.then(response => response.data)

}

const read = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}

const del = id => {
    const request =  axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request =  axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}
export default { 
    read, 
    create, 
    del,
    update
   
}