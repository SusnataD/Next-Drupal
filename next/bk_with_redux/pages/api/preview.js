const { NextApiRequest, NextApiResponse } = require("next");
const { drupal } = require("lib/drupal");

async function handler(request, response) {
  return await drupal.preview(request, response);
}

module.exports = handler;
