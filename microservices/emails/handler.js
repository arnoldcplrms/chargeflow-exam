module.exports.emailHandler = (event, context) => {
  console.log('Receiving records')
  console.log(event.Records)
}
