import Peep from '../models/peep.model.js';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import testData from './testData/samplePeeps.json' assert { type: "json" };
const testDataArray = testData.peeps;
import User from '../models/user.model.js';

chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {
    // Servers are stateless so we can create and keep it open here and make requests to testServer in tests
    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {
        try {
            await User.deleteMany();
            await Peep.deleteMany();
            console.log(`Database cleared`);
        } catch (error) {
            console.log(`Error clearing`);
            throw new Error();
        };
        try {
            await Peep.insertMany(testDataArray);
            console.log(`Database populated with test peeps`);
        } catch (error) {
            console.log(`Error inserting`);
            throw new Error();
        };
    });

    describe(`Testing the /allPeeps route GET request`, () => {
        it(`should return all of the peeps as an array`, async () => {
            const res = await testServer.get(`/`).send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testDataArray.length);
        });
    });

    describe('Testing the functionalities of the /register and /login routes', () => {
        it('should successfully register a user', async () => {
            const res = await chai.request(server).post('/register').send({ name: 'User1', email: 'test@example.com', password: 'testpassword', username: 'User1' });
            const user = await User.findOne({ email: 'test@example.com' });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Registration successful');
            expect(user).to.exist;
        });

        it('should not allow registration with an existing email', async () => {
            const existingUser = new User({ name: 'Existing User', email: 'test@example.com', password: 'existingpassword', username: 'User1' });
            await existingUser.save();

            const registerData = { name: 'Test User', email: 'test@example.com', password: 'testpassword', username: 'User2' };
            const res = await chai.request(server).post('/register').send(registerData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'User already exists');
        });

        it('should not allow registration with an existing username', async () => {
            const existingUser = new User({ name: 'Existing User', email: 'test@example.com', password: 'existingpassword', username: 'User1' });
            await existingUser.save();

            const registerData = { name: 'Test User', email: 'otherTest@example.com', password: 'testpassword', username: 'User1' };
            const res = await chai.request(server).post('/register').send(registerData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'This username already exists');
        });

        it('once registered, the user should be able to log in', async () => {
            const res = await chai.request(server).post('/register').send({ name: 'User1', email: 'test@example.com', password: 'testpassword', username: 'User1' });
            const loginRes = await chai.request(server).post('/login').send({ email: 'test@example.com', password: 'testpassword' });

            expect(loginRes).to.have.status(200);
            expect(loginRes.body).to.have.property('message', 'Login success');
        });
    });

    describe('Testing the /add route', () => {
        it('should successfully post the peep', async () => {
            let peep = {
                peepMessage: "A test peep",
                peepDateCreated: "2019-05-27T00:00:00.000Z",
                peepCreatedBy: "Marion",
                username: "@Rainbow"
            };
            
            const res = await chai.request(server).post('/add').send(peep);
                            
            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
            expect(res.body.peep).to.have.property(`peepMessage`, peep.peepMessage);
        });

        it(`should not create a peep without a message field`, async () => {
            let peep = {
                peepDateCreated: `2019-05-27T00:00:00.000Z`,
                peepCreatedBy: `Marion`,
                username: "@Rainbow"
            };

            const res = await chai.request(server).post(`/add`).send(peep);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new peep failed`);
        });

        it(`should not create a peep without a username field`, async () => {
            let peep = {
                peepMessage: "A test peep",
                peepDateCreated: `2019-05-27T00:00:00.000Z`,
                peepCreatedBy: `Marion`
            };

            const res = await chai.request(server).post(`/add`).send(peep);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new peep failed`);
        });

        it(`should not create a peep without a valid date`, async () => {
            let peep = {
                peepMessage: `No date peep`,
                peepDateCreated: `not a date`,
                peepCreatedBy: `Marion`,
                username: "@Rainbow"
            };

            const res = await chai.request(server).post(`/add`).send(peep);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new peep failed`);
        });

        it(`should not create a peep without a PeepCreatedBy field`, async () => {
            let peep = {
                peepMessage: `No date peep`,
                peepDateCreated: `2019-05-27T00:00:00.000Z`,
                username: "@Rainbow"
            };

            const res = await chai.request(server).post(`/add`).send(peep);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new peep failed`);
        });
    });
    

    // describe(`/GET/:id peep`, () => {
    //     it(`should GET a peep by the given id`, async () => {
    //         const testId = testDataArray[0]._id;
    //         const res = await testServer
    //             .get(`/peep/${testId}`)
    //             .send();

    //         expect(res).to.have.status(200);
    //         expect(res.body).to.have.property(`_id`, testId);
    //     });
    // });

    // describe(`/PUT/:id update existing peep`, () => {
    //     it(`should update a peep with PUT for the given id`, async () => {
    //         const peepToUpdate = testDataArray[0];
    //         peepToUpdate.peepMessage = `Hello`;

    //         const res = await testServer
    //             .put(`/peep/${peepToUpdate._id}`)
    //             .send(peepToUpdate);

    //         expect(res).to.have.status(201);
    //         expect(res.body.peep).to.have.property(`_id`, peepToUpdate._id);
    //     });

    //     it(`should return a 404 error if the peep to update's id from the url is not found`, async () => {
    //         const res = await testServer
    //             .put(`/peep/notAnId`)
    //             .send(testDataArray[0]);

    //         expect(res).to.have.status(404);
    //         expect(res.text).to.be.eql(`That peep cannot be found`);
    //     });
    // });
})