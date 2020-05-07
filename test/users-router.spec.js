const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoint', function () {
  let db;

  const { testUsers } = helpers.makeAssetTrendFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/users', () => {
    // context('User Validation', () => {
    //   beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    //   const requiredFields = ['user_name', 'password'];

    //   requiredFields.forEach((field) => {
    //     const registerAttemptBody = {
    //       user_name: 'test user_name',
    //       password: 'test password',
    //     };

    //     it(`responds with 400 required error when '${field}' is missing`, () => {
    //       delete registerAttemptBody[field];

    //       return supertest(app)
    //         .post('/api/users')
    //         .send(registerAttemptBody)
    //         .expect(400, {
    //           error: `Missing '${field}' in request body`,
    //         });
    //     });
    //     it('responds 400 \'Password must be longer than 8 characters\' when empty password', () => {
    //       const userShortPass = {
    //         user_name: 'test-user',
    //         password: '7654321',
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(userShortPass)
    //         .expect(400, {
    //           error: 'Password must be longer than 8 characters',
    //         });
    //     });
    //     it('responds 400 \'Password must be less than 72 characters\' when long password', () => {
    //       const userLongPass = {
    //         user_name: 'test-user',
    //         password: '*'.repeat(73),
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(userLongPass)
    //         .expect(400, { error: 'Password must be less than 72 characters' });
    //     });
    //     it('responds 400 error when password starts with spaces', () => {
    //       const userPassStartsSpaces = {
    //         user_name: 'test-user',
    //         password: ' 1@Pt4sadssd',
    //         full_name: 'test-name',
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(userPassStartsSpaces)
    //         .expect(400, {
    //           error: 'Password must not start or end with empty spaces',
    //         });
    //     });
    //     it('responds 400 error when password ends with spaces', () => {
    //       const userPassEndsSpaces = {
    //         user_name: 'test-user',
    //         password: '1@Pt4sadssd ',
    //         full_name: 'test-name',
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(userPassEndsSpaces)
    //         .expect(400, {
    //           error: 'Password must not start or end with empty spaces',
    //         });
    //     });
    //     it('responds 400 error when password isn\'t complex enough', () => {
    //       const userPassNotComplex = {
    //         user_name: 'test-user',
    //         password: '11AAaabb',
    //         full_name: 'test-name',
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(userPassNotComplex)
    //         .expect(400, {
    //           error: 'Password must contain 1 upper case, lower case, number and special character',
    //         });
    //     });
    //     it('responds 400 \'User name already taken\' when user_name isn\'t unique', () => {
    //       const duplicateUser = {
    //         user_name: testUser.user_name,
    //         password: '11AAaabb!!',
    //         full_name: 'test-name',
    //       };
    //       return supertest(app)
    //         .post('/api/users')
    //         .send(duplicateUser)
    //         .expect(400, { error: 'Username already taken' });
    //     });
    //   });
    // });
    context('Happy path', () => {
      it('responds 201, serialized user, storing bcryped password', () => {
        const newUser = {
          user_name: 'test user_name',
          password: 'ASDFasdf12!@',
        };
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property('id');
            expect(res.body.user_name).to.eql(newUser.user_name);
            expect(res.body).to.not.have.property('password');
          })
          .expect((res) => {
            db.from('users')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.user_name).to.eql(newUser.user_name);

                return bcrypt.compare(newUser.password, row.password);
              })
              .then((compareMatch) => {
                expect(compareMatch).to.be.true;
              });
          });
      });
    });
  });
});