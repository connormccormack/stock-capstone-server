require('dotenv').config();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('portfolios endpoints', function () {
  let db;

  const { testUsers, testPortfolioItems } = helpers.makeAssetTrendFixtures();
  const testUser = testUsers[0];
  const testPortfolioItem = testPortfolioItems[0];

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

  describe('POST /api/portfolios/', () => {
    context('Happy path', () => {
      it('responds 201', () => {
        const newPortfolioItem = {
          id: 1,
          user_id: 1, 
          asset_name: 'tesla', 
          asset_class: 'US Equity',
        };
        const agent = supertest
          .agent(app)
          .post('/api/auth/login')
          .send(testUser)
          .then(() => {
            supertest(app)
              .post('/api/portfolios/')
              .send(newPortfolioItem)
              .expect(201)
              .expect((res) => {
                console.log("blahblahblah")
                expect(res.body).to.have.property('user_id');
                // expect(res.body.asset_name).to.eql(newPortfolioItem.asset_name);
                // expect(res.body.asset_class).to.eql(newPortfolioItem.asset_class);
                expect(res.body).to.not.have.property('password');
              });

            return agent;
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });

});