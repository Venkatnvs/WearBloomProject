import AXIOS_INSTANCE from '../axios';

export const core_community_exchange_list = () =>
    AXIOS_INSTANCE.get(`/core/community/exchange/`);

export const core_community_exchange_create = data =>
    AXIOS_INSTANCE.post(`/core/community/exchange/`, data);

export const core_community_exchange_read = id =>
    AXIOS_INSTANCE.get(`/core/community/exchange/${id}/`);

export const core_community_exchange_update = (id, data) =>
    AXIOS_INSTANCE.put(`/core/community/exchange/${id}/`, data);

export const core_community_exchange_partial_update = (id, data) =>
    AXIOS_INSTANCE.patch(`/core/community/exchange/${id}/`, data);

export const core_community_exchange_delete = id =>
    AXIOS_INSTANCE.delete(`/core/community/exchange/${id}/`);