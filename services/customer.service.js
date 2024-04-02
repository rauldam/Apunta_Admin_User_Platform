import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/customers`;

export const customerService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};


async function register(customer) {
    await fetchWrapper.post(`${baseUrl}/register/`, customer);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}/`);
}


async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}/`, params);

    // update stored user if the logged in user updated their own record
    if (id === customerSubject.value.id) {
        // update local storage
        const customer = { ...customerSubject.value, ...params };
        localStorage.setItem('customer', JSON.stringify(customer));

        // publish updated user to subscribers
        customerSubject.next(customer);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}/`);
}
