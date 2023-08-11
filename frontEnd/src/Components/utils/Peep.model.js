export default class PeepModel {
  constructor(peepMessage, peepDateCreated, peepCreatedBy, username, _id) {
    this.peepMessage = peepMessage;
    this.peepDateCreated = peepDateCreated;
    this.peepCreatedBy = peepCreatedBy;
    this.username = username;
    this._id = _id;
    }
}
