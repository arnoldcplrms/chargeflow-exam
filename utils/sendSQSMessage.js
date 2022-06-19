const AWS = require('./AWSInstance')

const sqs = new AWS.SQS()

exports.sendSQSMessage = (queueUrl, message) =>
  sqs
    .sendMessage({ QueueUrl: queueUrl, MessageBody: JSON.stringify(message) })
    .promise()
