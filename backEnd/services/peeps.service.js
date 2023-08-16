import Peep from '../models/peep.model.js';

export const addPeepService = async peep => {
    try {
        // const newPeep = new Peep(newPeepData);
       const newPeep = new Peep(peep);

        return await newPeep.save();
    } catch (e) {
        throw e
    }
}

export const getPeepService = async id => {
    try {
        return await Peep.findById(id);
    }
    catch (e) {
        throw e;
    }
}

export const getPeepsService = async () => {
    try {
        return await Peep.find({});
    }
    catch (e) {
        throw e;
    }
}

export const updatePeepService = async (peep, id) => {
    const updatedPeep = { ...peep };
    delete updatedPeep._id;

    try {
        return await Peep.findByIdAndUpdate({ _id: id }, updatedPeep);
    }
    catch (e) {
        throw e;
    }
}
