import { Api } from './Api';

const  ENPOINTS = {
    Message: 'admin/message',
};

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Message, payload, signal)
}
export const MessageService = {
    create
}