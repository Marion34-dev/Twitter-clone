import axios from 'axios';

export const getPeeps = async () => {
    try {
                    const res = await axios.get(`http://localhost:5173/`);

        // const res = await axios.get(import.meta.env.VITE_PEEPSURL);
        if (Array.isArray(res.data) && res.data?.length > 0) return { peeps: res.data, status: res.status };
        throw new Error(`There are no peeps to retrieve, feel free to post one`);
    } catch (e) {
        return {
            peeps: [],
            status: e.response?.status ?? 204,
            error: {
                type: `get`,
                message: `Data not available from the server: ${e.message ?? e.response.message}`
            }
        }
    }
}

export const submitPeep = async peep => {
    try {
                    const res = await axios.post(`http://localhost:5173/add`, peep);

        // const res = await axios.post(`${import.meta.env.VITE_PEEPSURL}/add`, peep);
        return { peep: res.data, status: res.status };
    }
    catch (e) {
        return {
            status: e.response?.status ?? e.status,
            error: {
                type: `post`,
                message: e.response?.message ?? e.message
            }
        };
    }
}

export const updatePeep = async peep => {
    try {
            const res = await axios.put(`http://localhost:5173/peep${peep._id}`, peep);

        // const res = await axios.put(`${import.meta.env.VITE_PEEPSURL}/peep/${peep._id}`, peep);
        return { peep: res.data, status: res.status };
    }
    catch (e) {
        return {
            status: e.response?.status,
            error: {
                type: `put`,
                message: e.response?.message
            }
        };
    }
}