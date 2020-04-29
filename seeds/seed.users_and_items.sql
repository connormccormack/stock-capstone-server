INSERT INTO users (user_name, password)
VALUES
  ('user1', 'user1password'),
  ('user2', 'user2password'),
  ('user3', 'user3password')
;


INSERT INTO portfolio_items (user_id, asset_name, asset_class)
VALUES
  (1, 'Okta, Inc.', 'US Equity'),
  (1, 'Litecoin', 'Cryptocurrency'),
  (2, 'Slack Technologies, Inc.', 'US Equity'),
  (2, 'MongoDB, Inc.', 'US Equity'),
  (2, 'NVIDIA Corporation', 'US Equity'),
  (3, '0x Token', 'Cryptocurrency'),
  (3, 'Twilio, Inc.', 'US Equity'),
  (3, 'The Trade Desk, Inc.', 'US Equity')
;