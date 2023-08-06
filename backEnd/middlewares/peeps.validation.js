import { check } from 'express-validator';

export const newPeepValidation = [
    check('peepMessage').exists(),
    check('peepDateCreated').exists().isISO8601(),      // ISO date standard
    check('peepCreatedBy').exists()
];

export const updatePeepValidation = [
    check('peepMessage').exists(),
    check('peepDateCreated').exists().isISO8601(),
    check('peepCreatedBy').exists(),
    check('_id').exists().isMongoId()
];