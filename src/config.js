const { PORT, NODE_ENV, DATABASE_URL, TEST_DATABASE_URL, API_TOKEN, JWT_SECRET, CLIENT_ORIGIN } = process.env;

module.exports = {
  PORT: PORT || 8000,
  NODE_ENV: NODE_ENV || 'development',
  DATABASE_URL: DATABASE_URL || 'postgresql://postgres@localhost/stock_portfolio_database',
  TEST_DATABASE_URL: TEST_DATABASE_URL || 'postgresql://postgres@localhost/stock_portfolio_database_test',
  API_TOKEN,
  JWT_SECRET,
  // CLIENT_ORIGIN
}