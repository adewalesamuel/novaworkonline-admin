import { Api } from './Api';

const  ENPOINTS = {
    Permission: 'admin/permissions',
};

const getAll = signal => {
    return Api.get(ENPOINTS.Permission, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Permission}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Permission, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Permission}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Permission}/${id}`, signal)
}

export const PermissionService = {
    getAll,
    getById,
    create,
    update,
    destroy
}