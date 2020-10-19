import axios from 'axios'
const baseUrl = 'https://sheltered-thicket-76122.herokuapp.com/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => console.log('backend', response.data))
  // return request.then(response => response.data)
}

export default { getAll, create, update };