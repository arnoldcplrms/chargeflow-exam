#!/usr/bin/env sh

set -e

stage=$1

export $(cat .env | grep -v ^# | xargs)

node --max-old-space-size=4096 ./node_modules/serverless/bin/serverless deploy --verbose
#!/usr/bin/env bash

set +e

service=$1
authEnabled=$2

if [ -z "$authEnabled" ] || [ "$authEnabled" == "false" ];
then
  authEnabled="false"
else
  authEnabled="true"
fi
shift 1

while getopts ":d" o; do
    case "${o}" in
        d)
          debug=true
          ;;
    esac
done
shift $((OPTIND-1))

if [ -z "$service" ]; then
  echo "missing MICROSERVICE name"
  exit
fi

if [ "$service" == "products" ]; then
  echo "copying PRODUCTS serverless file"
  cp ./microservices/products/serverless.yml ./serverless.yml
fi

if [ "$service" == "checkouts" ]; then
  echo "copying CHECKOUTS serverless file"
  cp ./microservices/checkouts/serverless.yml ./serverless.yml
fi

if [ "$service" == "emails" ]; then
  echo "copying EMAILS serverless file"
  cp ./microservices/emails/serverless.yml ./serverless.yml
fi



if [ "$(uname)" == "Darwin" ]; then
  export $(cat .env | grep -v ^# | xargs)
else
  export $(cat .env | grep -v ^# | xargs -d '\r')
fi



node node_modules/serverless/bin/serverless.js deploy --verbose
exit


read
