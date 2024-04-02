import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/courts`;


export const courtService = {
  getAll,
  getById,
  update,
  getAllByFk,
  delete: _delete
};

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

async function getAllByFk(id){
  return await fetchWrapper.get(`${baseUrl}/customer/${id}/`);
}
async function getById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}/`);
}

async function update(id, params) {
  await fetchWrapper.put(`${baseUrl}/${id}/`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
  await fetchWrapper.delete(`${baseUrl}/${id}/`);
}
