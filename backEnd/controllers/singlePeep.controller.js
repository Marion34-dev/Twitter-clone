import { validationResult } from 'express-validator';

import { getPeepService, updatePeepService } from "../services/peeps.service.js";

export const getSinglePeep = async (req, res) => {
    const peep = await getPeepService(req.params.id);
    if (!peep) {
        res.status(404).send(`That peep cannot be found`);
    } else {
        res.json(peep);
    }
}

export const updatePeep = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Update not possible.`);
    }
    try {
        const peep = await updatePeepService(req.body, req.params.id);
        res.status(201).json({ peep });
    } catch (error) {
        res.status(404).send(`That peep cannot be found`);
    }
}