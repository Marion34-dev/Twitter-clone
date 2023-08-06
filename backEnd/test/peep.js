import Peep from '../models/peep.model.js';

import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../index.js';
import testData from './testData/samplePeeps.json' assert { type: "json" };
const testDataArray = testData.peeps;

chai.use(chaiHttp);


// describe(`Testing requests on the database`, () => {

//     // Servers are stateless so we can create and keep it open here and make requests to testServer in tests
//     const testServer = chai.request(server).keepOpen();

//     beforeEach(async () => {
//         try {
//             await Peep.deleteMany();
//             console.log(`Database cleared`);
//         } catch (error) {
//             console.log(`Error clearing`);
//             throw new Error();
//         };
//         try {
//             await Peep.insertMany(testDataArray);
//             console.log(`Database populated with test peeps`);
//         } catch (error) {
//             console.log(`Error inserting`);
//             // Terminate the test
//             throw new Error();
//         };
//     });



//     describe(`/GET peeps`, () => {

//         it(`should return all of the peeps as an array`, async () => {
//             const res = await testServer
//                 .get(`/`)
//                 .send();
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an(`array`);
//             expect(res.body.length).to.equal(testDataArray.length);
//         });
//     });

// //     describe(`/POST create a peep`, () => {
// //         it(`should not create a peep without a message field`, async () => {
// //             let peep = {
// //                 peepDateCreated: `2019-05-27T00:00:00.000Z`,
// //                 peepCreatedBy: `Marion`
// //             };

// //             const res = await testServer
// //                 .post(`/add`)
// //                 .send(peep);

// //             expect(res).to.have.status(422);
// //             expect(res).to.have.property(`error`);
// //             expect(res.text).to.be.eql(`Adding new peep failed`);
// //         });

// //         it(`should not create a peep without a valid date`, async () => {
// //             let peep = {
// //                 peepMessage: `No date peep`,
// //                 peepDateCreated: `not a date`,
// //                 peepCreatedBy: `Marion`
// //             };

// //             const res = await testServer
// //                 .post(`/add`)
// //                 .send(peep);

// //             expect(res).to.have.status(422);
// //             expect(res).to.have.property(`error`);
// //             expect(res.text).to.be.eql(`Adding new peep failed`);
// //         });

// //         it(`should not create a peep without a PeepCreatedBy field`, async () => {
// //             let peep = {
// //                 peepMessage: `No date peep`,
// //                 peepDateCreated: `2019-05-27T00:00:00.000Z`,
// //             };

// //             const res = await testServer
// //                 .post(`/add`)
// //                 .send(peep);

// //             expect(res).to.have.status(422);
// //             expect(res).to.have.property(`error`);
// //             expect(res.text).to.be.eql(`Adding new peep failed`);
// //         });

// //         it(`should create a peep that is properly formed`, async () => {
// //             let peep = {
// //                 peepMessage: "A test peep",
// //                 peepDateCreated: "2019-05-27T00:00:00.000Z",
// //                 peepCreatedBy: "Marion",
// //         };

// //             const res = await testServer
// //                 .post(`/add`)
// //                 .send(peep)
            
// //             expect(res).to.have.status(201);
// //             expect(res.body).to.be.an(`object`);
// //             expect(res.body.peep).to.have.property(`peepMessage`, peep.peepMessage);
// //         });
// //     });
    

// //     describe(`/GET/:id peep`, () => {
// //         it(`should GET a peep by the given id`, async () => {
// //             const testId = testDataArray[0]._id;
// //             const res = await testServer
// //                 .get(`/peep/${testId}`)
// //                 .send();

// //             expect(res).to.have.status(200);
// //             expect(res.body).to.have.property(`_id`, testId);
// //         });
// //     });

// //     describe(`/PUT/:id update existing peep`, () => {
// //         it(`should update a peep with PUT for the given id`, async () => {
// //             const peepToUpdate = testDataArray[0];
// //             peepToUpdate.peepMessage = `Hello`;

// //             const res = await testServer
// //                 .put(`/peep/${peepToUpdate._id}`)
// //                 .send(peepToUpdate);

// //             expect(res).to.have.status(201);
// //             expect(res.body.peep).to.have.property(`_id`, peepToUpdate._id);
// //         });

// //         it(`should return a 404 error if the peep to update's id from the url is not found`, async () => {
// //             const res = await testServer
// //                 .put(`/peep/notAnId`)
// //                 .send(testDataArray[0]);

// //             expect(res).to.have.status(404);
// //             expect(res.text).to.be.eql(`That peep cannot be found`);
// //         });
// //     });

// });