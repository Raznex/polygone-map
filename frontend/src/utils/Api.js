import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000/api/coordinates';

export async function getAllPolygons() {
  try {
    const res = await axios.get(`${baseURL}`, {});
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postNewPolygon(body) {
  try {
    const res = await axios.post(`${baseURL}/`, body);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deletePolygon(id) {
  try {
    const res = await axios.delete(`${baseURL}/${id}/`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function updatePolygon(id, body) {
  try {
    const res = await axios.put(`${baseURL}/${id}/`, body);
    return res.data;
  } catch (err) {
    throw err;
  }
}
