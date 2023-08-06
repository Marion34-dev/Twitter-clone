import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import Peep from '../models/peep.model.js'; // Import the Peep model (if not already imported)

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication and Adding Peep', () => {
    let authenticatedAgent; // HTTP agent to store cookies for authenticated requests
    const testServer = chai.request(server).keepOpen(); // Keep the server open for testing

    // Before running the tests, login to get authentication cookies
    before(async () => {
        authenticatedAgent = chai.request.agent(server);

        // Perform login to get authenticated cookies
        await authenticatedAgent
            .post('/login')
            .send({ email: 'test@example.com', password: 'testpassword' });
    });

    // After all tests are done, close the server and release the authenticated agent
    after((done) => {
        testServer.close(); // Close the test server after all tests are done
        authenticatedAgent.close();
        done();
    });

    it('should not allow adding a peep when not logged in', async () => {
        const res = await chai.request(server).post('/add').send({ peepMessage: 'Test peep' });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Unauthorized');
    });
});


