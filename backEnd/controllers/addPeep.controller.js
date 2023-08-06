import { validationResult } from 'express-validator';
import { addPeepService } from '../services/peeps.service.js';


export const addPeepController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Adding new peep failed`);
    }
    try {
        const peep = await addPeepService(req.body);
        res.status(201).json({ peep });
    } catch (error) {
        console.log(error);
        res.status(400).send(`Adding new peep failed`);
    }
};