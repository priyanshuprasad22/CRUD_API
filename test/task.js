import { expect } from 'chai';
import chai from 'chai'
import chaiHttp from 'chai-http';
import createServer from '../index.js'

chai.use(chaiHttp);

describe('User API Routes', async() => {

  const server = await createServer();


  describe('GET /api/v1/user/', () => {
    it('should return status 200 and a list of users', async function () {
      const res = await chai.request(server).get('/api/v1/user/');
      
      // console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    }).timeout(10000);
  });


  describe('GET /api/v1/users/', () => {
    it('should not return status 200 and a list of users', async function () {
      
      const res = await chai.request(server).get('/api/v1/users/');
      
      // console.log(res);
      expect(res).to.have.status(404);
    }).timeout(10000);
  });

    describe('POST /api/v1/user/add', () => {
      it('should add a new user and return success', async function () {
        const newUser = {
          name: 'Logan',
          email: 'logan@gmail.com',
          age: 23
        };
  
        const res = await chai.request(server)
          .post('/api/v1/user/add')
          .send(newUser);
  
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name', 'Logan');
        expect(res.body.data).to.have.property('email', 'logan@gmail.com');
        expect(res.body.data).to.have.property('age', 23);
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('__v', 0);
      }).timeout(10000);
    });

    describe('PATCH /api/v1/user/update', () => {
      it('should update an existing user and return the updated user data', async function () {

        const userId = '6612b4ae3547e1885a63968f'; 
        
        const name="New user";
        const email="shanenew@gmail.com";
        const age=34;
  
        const res = await chai.request(server)
          .patch(`/api/v1/user/update/${userId}`)
          .send({name,email,age});

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('userupdate');
        expect(res.body.userupdate).to.have.property('_id', userId);
        expect(res.body.userupdate).to.have.property('name', name);
        expect(res.body.userupdate).to.have.property('email', email);
        expect(res.body.userupdate).to.have.property('age', age);
      }).timeout(10000);
    });

  
    describe('DELETE /api/v1/user/remove', () => {
      it('should delete an existing user and return the status 200', async function () {
        
        const userId = '6612c4aca1a89b1d934fcf1c'; 

        const res = await chai.request(server)
          .delete(`/api/v1/user/remove/${userId}`);

        expect(res).to.have.status(200);
        
    }).timeout(10000);
  });

});
