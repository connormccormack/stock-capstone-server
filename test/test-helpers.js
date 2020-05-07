const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      password: "ASDFasdf12!@",
    },
    {
      id: 2,
      user_name: "test-user-2",
      password: "ASDFasdf12!@",
    },
    {
      id: 3,
      user_name: "test-user-3",
      password: "ASDFasdf12!@",
    },
    {
      id: 4,
      user_name: "test-user-4",
      password: "ASDFasdf12!@",
    },
  ];
}

function makePortfolioItemsArray() {
  return [
    {
      id: 1,
      user_id: 1, 
      asset_name: "tesla", 
      asset_class: "US Equity",
    },
    {
      id: 1,
      user_id: 1, 
      asset_name: "tesla", 
      asset_class: "US Equity",
    },
  ];
}

function makeAssetTrendFixtures() {
  const testUsers = makeUsersArray();
  const testPortfolioItems = makePortfolioItemsArray();
  return { testUsers, testPortfolioItems };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      portfolio_items,
      RESTART IDENTITY CASCADE`
  );
}
function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('asset_trend_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makePortfolioItemsArray,
  makeAssetTrendFixtures,
  makeAuthHeader,
  seedUsers,
  cleanTables,
};