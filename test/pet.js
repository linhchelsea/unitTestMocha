process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let index = require('../index')
let should = chai.should()

chai.use(chaiHttp)

describe('Pets', () => {
    beforeEach((done) =>{
        done()
    });

    describe('/GET pets', () => {
        it('Get all the pets success', (done) => {
            chai.request(index)
                .get('/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9);
                    done();
            });
        });
    });


    describe('/GET/:id pets', () => {
        it('Get pet by ID success', (done) => {
            let id = 1;
            chai.request(index)
                .get('/pets/' + id)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('id').eql(id);
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    done();
            });
        });

        it('Can not find pet', (done) => {
            let id = 10;
            chai.request(index)
                .get('/pets/' + id)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Can not find pet');
                    done();
            });
        });
    });

    describe('/POST pets', () => {
        it('Create a new pet success', (done) => {
            let body = {
                name : 'doraemon',
                status : 'available'
            }
            chai.request(index)
                .post('/pets')
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('id');
                    res.body.pet.should.have.property('name').eql(body.name);
                    res.body.pet.should.have.property('status').eql(body.status);
                    done();
            });
        });
        it('Create a new pet fail, missing status property',(done) => {
            let body = {
                name : 'Hoa ki lan'
            }
            chai.request(index)
                .post('/pets')
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet is invalid');
                    done();
                });
        });
        it('Create a new pet fail, missing name property',(done) => {
            let body = {
                status : 'available'
            }
            chai.request(index)
                .post('/pets')
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet is invalid');
                    done();
                });
        });
    });

    describe('/PUT/:id pets',() => {
       it('Update pet success', (done) =>{
            let id = 1;
            let body = {
                name : 'ahihi',
                status : 'do ngok'
            }
            chai.request(index)
                .put('/pets/'+id)
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.have.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('id').eql(id);
                    res.body.pet.should.have.property('name').eql(body.name);
                    res.body.pet.should.have.property('status').eql(body.status);
                    done();
            });
        });
       it('Can not find pet to update', (done) =>{
            let id = 10;
            let body = {
                name : 'ahihi',
                status : 'do ngok'
            }
            chai.request(index)
                .put('/pets/'+id)
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.have.be.a('object');
                    res.body.should.have.property('message').eql('Can not find pet');
                    done();
            });
        });
    });
    describe('/DELETE/:id pets',() =>{
       it('Delete pet success',(done) => {
            let id = 1;
            chai.request(index)
                .delete('/pets/'+id)
                .end((err,res) => {
                res.should.have.status(200);
                res.should.have.be.a('object');
                res.body.should.have.property('message').eql('Delete pet success');
                done();
            });
        });
    });
});

