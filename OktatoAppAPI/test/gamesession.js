let User = require('../controllers/gamesession')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
let expect = chai.expect()

chai.use(chaiHttp);


describe('GET /gamesessions', () => {
    var token;
    it('should let us log in', (done) =>{
        chai.request(server)
        .post('/OktatoAppAPI/users/login')
        .set('Content-Type','application/json')
        .send({username: 'unittest', password:'unittest', login_type: 'ADMIN'})
        .end((err,res)=>{
            res.should.have.status(201)
            token = res.body.data[0].token
            done()
        })
    })
    it('fetch all the game-session data', (done) => {
        chai.request(server)
        .get('/OktatoAppAPI/game-sessions')
        .set('Authorization','Bearer '+token)
        .end((err, res) => {
            res.should.have.status(200)

            res.body.data.should
            .be.an.instanceof(Array)
            .and.to.have.property(0)
            .that.includes.all.keys([ 'id', 'session_name', 'max_points' ])
            done()
        })
    })
    it('it shouldn\'t return all the game-session, because we\' not logged in', (done) => {
        chai.request(server)
        .get('/OktatoAppAPI/users')
        .end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })
})

describe('GET /gamesessions/:id', () => {
    var token;
    it('should let us log in', (done) =>{
        chai.request(server)
        .post('/OktatoAppAPI/users/login')
        .set('Content-Type','application/json')
        .send({username: 'unittest', password:'unittest', login_type: 'ADMIN'})
        .end((err,res)=>{
            res.should.have.status(201)
            token = res.body.data[0].token
            done()
        })
    })
    it('fetch game-session where id = params.id', (done) => {
        chai.request(server)
        .get('/OktatoAppAPI/game-sessions/1')
        .set('Authorization','Bearer '+token)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.data.should
            .be.an.instanceof(Array)
            .and.to.have.property(0)
            .that.includes.all.keys([ 'id', 'session_name', 'max_points' ])
            .and.property('id').to.be.equal(1)
            done()
        })
    })
    it('return with 404, because params is a string', (done) => {
        chai.request(server)
        .get('/OktatoAppAPI/game-sessions/string')
        .set('Authorization','Bearer '+token)
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
})



