import Peep from '../models/peep.model.js';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
// import testData from './testData/samplePeeps.json' assert { type: "json" };
// const testDataArray = testData.peeps;
import User from '../models/user.model.js';
import { addPeepService, getPeepService, getPeepsService, updatePeepService } from '../services/peeps.service.js'; 

chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {
    // Servers are stateless so we can create and keep it open here and make requests to testServer in tests
    const testServer = chai.request(server).keepOpen();

    // beforeEach(async () => {
    //     try {
    //         await User.deleteMany();
    //         await Peep.deleteMany();
    //         console.log(`Test database has been cleared`);
    //     } catch (error) {
    //         console.log(`Error clearing test database`);
    //         throw new Error();
    //     };
    //     try {
    //         await Peep.insertMany(testDataArray);
    //         console.log(`Database populated with test peeps`);
    //     } catch (error) {
    //         console.log(`Error inserting test peeps`);
    //         throw new Error();
    //     };
    // });

    describe(`Testing the /allPeeps route GET request`, () => {
        it(`should return all of the peeps as an array`, async () => {
            const res = await testServer.get(`/`).send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            // expect(res.body.length).to.equal(testDataArray.length);
        });
    });

    describe('Testing the functionalities of the /register and /login routes', () => {
        it('should successfully register a user', async () => {
        const res = await chai.request(server).post('/register').send({ name: 'User123', email: 'test123@example.com', password: 'testpassword', username: 'User123' });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Registration successful');

        const userToDelete = await User.findOne({ email: 'test123@example.com' });

        expect(userToDelete).to.exist;
        await User.deleteOne({ email: 'test123@example.com' });
});


        it('should not allow registration with an existing email', async () => {
            const existingUser = new User({ name: 'Existing User', email: 'test@example.com', password: 'existingpassword', username: 'User1' });
            await existingUser.save();

            const registerData = { name: 'Test User', email: 'test@example.com', password: 'testpassword', username: 'User2' };
            const res = await chai.request(server).post('/register').send(registerData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'It seems you already have an account with us.');

            await Peep.deleteOne({ _id: res.body._id });
            const newUserToDelete = await User.findOne({ username: 'User1' });
            await User.deleteOne({ _id: newUserToDelete._id });
        }); 

        it('should not allow registration with an existing username', async () => {
            const existingUser = new User({ name: 'Existing User', email: 'test@example.com', password: 'existingpassword', username: 'User1' });
            await existingUser.save();

            const registerData = { name: 'Test User', email: 'otherTest@example.com', password: 'testpassword', username: 'User1' };
            const res = await chai.request(server).post('/register').send(registerData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Sorry, this username already exists.');

            await Peep.deleteOne({ _id: res.body._id });
            const newUserToDelete = await User.findOne({ username: 'User1' });
            await User.deleteOne({ _id: newUserToDelete._id });
        });

        it('once registered, the user should be able to log in', async () => {
            const res = await chai.request(server).post('/register').send({ name: 'User12', email: 'test@example.com', password: 'testpassword', username: 'User12' });
            const loginRes = await chai.request(server).post('/login').send({ email: 'test@example.com', password: 'testpassword' });

            expect(loginRes).to.have.status(200);
            expect(loginRes.body).to.have.property('message', 'You are successfully logged in!');

            await Peep.deleteOne({ _id: res.body._id });
            const newUserToDelete = await User.findOne({ username: 'User12' });
            await User.deleteOne({ _id: newUserToDelete._id });
        });
    });

    describe('Testing the /add route', () => {
        it('should successfully post the peep', async () => {
            let peep = {
                peepMessage: "A test peep",
                peepDateCreated: "2021-05-27T00:00:00.000Z",
                peepCreatedBy: "Marion",
                username: "@Rainbow"
            };
            
            const res = await chai.request(server).post('/add').send(peep);
                            
            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
            expect(res.body.peep).to.have.property(`peepMessage`, peep.peepMessage);

            const createdPeepId = res.body._id || (await Peep.findOne({ peepMessage: peep.peepMessage }))._id;
            await Peep.deleteOne({ _id: createdPeepId });
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

            await Peep.deleteOne({ _id: res.body._id });
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
            
            await Peep.deleteOne({ _id: res.body._id });
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
            
            await Peep.deleteOne({ _id: res.body._id });
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
            
            await Peep.deleteOne({ _id: res.body._id });
        });
    });

    describe('Testing the /login route', () => {

    it('should not allow login with incorrect password', async () => {
        const registerData = { name: 'User1', email: 'test@example.com', password: 'testpassword', username: 'User1' };
        const registerRes = await chai.request(server).post('/register').send(registerData);

        const loginRes = await chai.request(server).post('/login').send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(loginRes).to.have.status(401);
        expect(loginRes.body).to.have.property('message', 'Invalid credentials');

        await Peep.deleteOne({ _id: registerRes.body._id });    
    });

    it('should not allow login with non-existing email', async () => {
        const loginRes = await chai.request(server).post('/login').send({ email: 'nonexistent@example.com', password: 'testpassword' });

        expect(loginRes).to.have.status(401);
        expect(loginRes.body).to.have.property('message', 'Invalid credentials');

        await Peep.deleteOne({ _id: loginRes.body._id });
    });

    it('should not allow login without providing email', async () => {
        const loginRes = await chai.request(server).post('/login').send({ password: 'testpassword' });

        expect(loginRes).to.have.status(401);
        expect(loginRes.body).to.have.property('message', 'Invalid credentials');

        await Peep.deleteOne({ _id: loginRes.body._id });
    });

    it('should not allow login without providing password', async () => {
        const loginRes = await chai.request(server).post('/login').send({ email: 'test@example.com' });

        expect(loginRes).to.have.status(500);
        expect(loginRes.body).to.have.property('message', 'Error logging in');
    });

    it('should store user data in session upon successful login', async () => {
        const registerData = { name: 'User1', email: 'test@example.com', password: 'testpassword', username: 'User1' };
        await chai.request(server).post('/register').send(registerData);

        const loginRes = await chai.request(server).post('/login').send({ email: 'test@example.com', password: 'testpassword' });

        expect(loginRes).to.have.status(200);
        expect(loginRes.body).to.have.property('message', 'You are successfully logged in!');
        expect(loginRes.body).to.have.property('user');
        expect(loginRes.body.user).to.have.property('email', 'test@example.com');
        expect(loginRes.body.user).to.have.property('name', 'User1');

        await Peep.deleteOne({ _id: loginRes.body._id });
        const newUserToDelete = await User.findOne({ username: 'User1' });
        await User.deleteOne({ _id: newUserToDelete._id });
    });
    });
    
    describe('Testing the peeps.service function', () => {
        describe('Testing the addPeepService function', () => {
            it('should successfully add a new peep', async () => {
                const newPeep = {
                    peepMessage: 'New test peep',
                    peepDateCreated: '2023-08-16T00:00:00.000Z',
                    peepCreatedBy: 'Alice',
                    username: '@Wonderland'
                };

                const addedPeep = await addPeepService(newPeep);
                expect(addedPeep).to.exist;
                expect(addedPeep.peepMessage).to.equal(newPeep.peepMessage);

                await Peep.deleteOne({ _id: addedPeep._id });  
            });

            it('should throw an error when adding a peep with missing fields', async () => {
                const incompletePeep = {
                    peepDateCreated: '2023-08-16T00:00:00.000Z',
                    peepCreatedBy: 'Bob'
                };

                try {
                    await addPeepService(incompletePeep);
                    throw new Error('Test should have thrown an error');
                } catch (error) {
                    expect(error).to.exist;
                }

                await Peep.deleteOne({ _id: incompletePeep._id });
            });
        });

        describe('Testing the getPeepsService function', () => {
            it('should retrieve an array of all peeps', async () => {
                const allPeeps = await getPeepsService();
                expect(allPeeps).to.be.an('array');
                expect(allPeeps.length).to.be.at.least(1);
            });
        });

        describe('Testing the updatePeepService function', () => {  
            it('should throw an error when updating a peep with invalid ID', async () => {
                const invalidPeepId = 'invalid-id';
                const updatedPeepData = {
                    peepMessage: 'Updated test peep'
                };

                try {
                    await updatePeepService(updatedPeepData, invalidPeepId);
                    // If no error is thrown, the test should fail
                    throw new Error('Test should have thrown an error');
                } catch (error) {
                    expect(error).to.exist;
                }
            });
        });
    });

        describe('Testing the allPeeps controller', () => {
            it('should retrieve peeps with correct properties', async () => {
                const allPeeps = await getPeepsService();
                expect(allPeeps).to.be.an('array');
                expect(allPeeps.length).to.be.at.least(1);

                for (const peep of allPeeps) {
                    expect(peep).to.have.property('peepMessage');
                    expect(peep).to.have.property('peepDateCreated');
                    expect(peep).to.have.property('peepCreatedBy');
                    expect(peep).to.have.property('username');
                }
            });

            it('should retrieve peeps with valid date formats', async () => {
                const allPeeps = await getPeepsService();
                expect(allPeeps).to.be.an('array');
                expect(allPeeps.length).to.be.at.least(1);

                for (const peep of allPeeps) {
                    const peepDate = new Date(peep.peepDateCreated);
                    expect(peepDate).to.be.a('date');
                    expect(peepDate.toString()).to.not.equal('Invalid Date');
            }
        });
    });
});
