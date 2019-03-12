#!/bin/bash
if [ "${DATABASE_URL}" == "" ]
then
  echo "DATABASE_URL required"
  exit 1
fi

echo "Running npm install on application"
npm install
npm run grunt

echo "Capturing npm audit results"
npm audit --json > npm-audit.json

echo "Running database migration"
npm run prestart

echo "Running test"
npm test
