import { Api } from './Api';

const  ENPOINTS = {
    User: 'admin/users',
};

const getQualified = (params, signal) => {
    return Api.get(`${ENPOINTS.User}/qualified?page=${params?.page ?? 1}`, signal)
}

const getAll = (params, signal) => {
    return Api.get(`${ENPOINTS.User}?page=${params?.page ?? 1}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.User}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.User, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.User}/${id}`, payload, signal)
}

const qualify = (id, signal) => {
    return Api.post(`${ENPOINTS.User}/${id}/qualify`, null, signal)
}

const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.User}/${id}`, signal)
}

export const UserService = {
    getQualified,
    qualify,
    getAll,
    getById,
    create,
    update,
    destroy
}