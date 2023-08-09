import mongoose from 'mongoose';

const peepSchema = new mongoose.Schema({
    peepMessage: { type: String, required: true },
    peepDateCreated: { type: Date, default: Date.now, required: true },
    peepCreatedBy: { type: String, required: true },
    username: { type: String, required: true }
});

const Peep = mongoose.model(`Peep`, peepSchema);

export default Peep;
