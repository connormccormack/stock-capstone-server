const express = require('express');
const path = require('path');
const PortfoliosService = require('./portfolios-service');
const { requireAuth } = require('../middleware/jwt-auth');

const assetsRouter = express.Router();
const jsonBodyParser = express.json();

assetsRouter
  .route('/:item_id')
  .delete((req, res, next) => {
    PortfoliosService.deleteItem(
      req.app.get('db'),
      req.params.item_id
    )
      .then(rowCount => {
        res.sendStatus(rowCount ? 204 : 404);
      })
      .catch(next);
  });



module.exports = assetsRouter;