INSERT INTO users (user_name, password)
VALUES
  ('user1', '$2a$12$aH7IK0dM.sZf/ysCaYppyORtNEFqNTggvszd85N7RatSDlVw73Ore'),
  ('user2', '$2a$12$LM7atALdf1FAKfBtiqb0quuK3nlb.WeR4POjBthx7BaADwhUbh5TO'),
  ('user3', '$2a$12$G5FMc3mhn5z3a7ULY7aRNODfBSLVWSBG6rOw/LAYxHB1SBrBWJOay')
;

/* user1password, user2password, user3password are passwords for users 1-3 */

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