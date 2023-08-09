import express from 'express';
import { getSinglePeep, updatePeep } from '../controllers/singlePeep.controller.js';
import { updatePeepValidation } from '../middleware/peeps.validation.js';


const router = express.Router();

router.use(express.json());

router.route('/:id')
    .get(getSinglePeep)
    .put(updatePeepValidation, updatePeep);

export { router as singlePeep };
