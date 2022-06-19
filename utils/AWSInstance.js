const AWS = require('aws-sdk')

AWS.config.update({
  region: process.env.ENV_AWS_REGION,
  accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY,
})

module.exports = AWS
