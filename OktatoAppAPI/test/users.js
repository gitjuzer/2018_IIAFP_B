let User = require('../controllers/user')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
let expect = chai.expect()

chai.use(chaiHttp);

describe('GET /users', () => {
    it('it shouldn\'t return all the users, because we\' not logged in', (done) => {
        chai.request(server)
        .get('/OktatoAppAPI/users')
        .end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })
})

describe('POST /login', () =>{
    it('should let us log in, and return a valid token', (done)=>{
        chai.request(server)
        .post('/OktatoAppAPI/users/login')
        .set('Content-Type','application/json')
        .send({username: 'unittest', password:'unittest', login_type: 'ADMIN'})
        .end((err,res)=>{
            res.should.have.status(201)
            done()
        })
    })
})

