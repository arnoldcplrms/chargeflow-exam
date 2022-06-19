const awsInstance = require('../../utils/AWSInstance')
const SES = new awsInstance.SES()

const emailBody = (customer, product) => `
Hi ${customer.name}

Here is the summary of your order

Product Name : ${product.name}
Description : ${product.description}
Price : ${product.price}

Your Address : ${customer.address}

`

const sendEmailHandler = async (record) => {
  const details = JSON.parse(record.body)
  const { customer, product } = details

  const params = {
    Destination: {
      ToAddresses: [customer.email],
    },
    Message: {
      Body: {
        Text: { Data: emailBody(customer, product) },
      },
      Subject: { Data: 'Test Order' },
    },
    Source: 'arnoldcplrms@gmail.com',
  }
  await SES.sendEmail(params).promise()
}

module.exports.emailHandler = async (event, context) => {
  const SQSRecords = event.Records
  await Promise.all(SQSRecords.map(sendEmailHandler))
}
