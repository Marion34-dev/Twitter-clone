import { getPeepsService } from '../services/peeps.service.js';

export const allPeeps = async (req, res) => {
    try {
        const peeps = await getPeepsService();
        
        // Sorting in reverse chronological order
        peeps.sort((a, b) => new Date(b.peepDateCreated) - new Date(a.peepDateCreated));
        res.json(peeps)
    } catch (e) {
        res.status(404).send(`Not found`);
    }
}