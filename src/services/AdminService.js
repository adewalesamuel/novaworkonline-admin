import { Api } from './Api';

const  ENPOINTS = {
    Admin: 'admin/admins',
};

const analytics = signal => {
    return Api.get(`admin/analytics`, signal)
}

const getAll = signal => {
    return Api.get(ENPOINTS.Admin, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Admin}/${id}`, signal);
}

const getProfile = signal => {
    return Api.get(`admin/profile`, signal)
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Admin, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Admin}/${id}`, payload, signal)
}

const updateProfile = (payload, signal) => {
    return Api.put(`admin/profile`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Admin}/${id}`, signal)
}

export const AdminService = {
    analytics,
    getAll,
    getById,
    getProfile,
    updateProfile,
    create,
    update,
    destroy
}