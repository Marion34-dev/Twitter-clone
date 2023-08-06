import { getPeepsService } from '../services/peeps.service.js';

export const allPeeps = async (req, res) => {
    try {
        const peeps = await getPeepsService();
        res.json(peeps)
    } catch (e) {
        res.status(404).send(`Not found`);
    }
}