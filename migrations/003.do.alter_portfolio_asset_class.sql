CREATE TYPE class_type AS ENUM (
    'US Equity',
    'International Equity',
    'Cryptocurrency',
    'Fiat Currency',
    'Bonds',
    'Real Estate',
    'Alternative Investments',
    'Precious Metals & Commodities'
);

ALTER TABLE portfolio_items
  ADD COLUMN
    asset_class class_type;