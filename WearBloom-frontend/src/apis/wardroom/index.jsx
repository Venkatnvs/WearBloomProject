import AXIOS_INSTANCE from '../axios';

export const core_wardroom_wardrobe_create = data =>
    AXIOS_INSTANCE.post(
        `/core/wardroom/wardrobe/`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

export const core_wardroom_wardrobe_list = () =>
    AXIOS_INSTANCE.get(`/core/wardroom/wardrobe/`);

export const core_wardroom_wardrobe_read = id =>
    AXIOS_INSTANCE.get(`/core/wardroom/wardrobe/${id}/`);

export const core_wardroom_wardrobe_update = (id, data) =>
    AXIOS_INSTANCE.put(`/core/wardroom/wardrobe/${id}/`, data);

export const core_wardroom_wardrobe_partial_update = (id, data) =>
    AXIOS_INSTANCE.patch(`/core/wardroom/wardrobe/${id}/`, data);

export const core_wardroom_wardrobe_delete = id =>
    AXIOS_INSTANCE.delete(`/core/wardroom/wardrobe/${id}/`);