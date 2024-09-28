import AXIOS_INSTANCE from '../axios';

export const core_wardroom_outfit_list = () =>
    AXIOS_INSTANCE.get(`/core/wardroom/outfit/`);

export const core_wardroom_outfit_detailed_list = () =>
    AXIOS_INSTANCE.get(`/core/wardroom/outfit-detailed/`);

export const core_wardroom_outfit_create = data =>
    AXIOS_INSTANCE.post(`/core/wardroom/outfit/`, data);

export const core_wardroom_outfit_read = id =>
    AXIOS_INSTANCE.get(`/core/wardroom/outfit/${id}/`);

export const core_wardroom_outfit_details_read = id =>
    AXIOS_INSTANCE.get(`/core/wardroom/outfit-detail/${id}/`);

export const core_wardroom_outfit_update = (id, data) =>
    AXIOS_INSTANCE.put(`/core/wardroom/outfit/${id}/`, data);

export const core_wardroom_outfit_partial_update = (id, data) =>
    AXIOS_INSTANCE.patch(`/core/wardroom/outfit/${id}/`, data);

export const core_wardroom_outfit_delete = id =>
    AXIOS_INSTANCE.delete(`/core/wardroom/outfit/${id}/`);