const express = require('express');
const path = require('path');
const PortfoliosService = require('./portfolios-service');
const { requireAuth } = require('../middleware/jwt-auth');

const portfoliosRouter = express.Router();
const jsonBodyParser = express.json();

portfoliosRouter
  .route('/:user_id')
  .get((req, res, next) => {
    PortfoliosService.getAssetList(
      req.app.get('db'),
      req.params.user_id
    )
      .then(assets => {
        res.json(assets);
      })
      .catch(next);
  });
// .delete((req, res, next) => {
//   PortfoliosService.deleteItem(
//     req.app.get('db'),
//     req.params.assetId
//   )
//     .then(response => {
//       res.json(response);
//     })
//     .catch(next);
// });

portfoliosRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    console.log('hello');
    const { assetName, assetClass, user_id } = req.body;
    const newItem = { asset_name: assetName, asset_class: assetClass, user_id };

    for (const [key, value] of Object.entries(newItem)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    PortfoliosService.insertItem(
      req.app.get('db'),
      newItem
    )
      .then(() => {
        res.send({});
      })
      .catch(next);
  });


module.exports = portfoliosRouter;