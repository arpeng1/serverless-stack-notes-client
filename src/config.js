export default {
  s3: {
    REGION: 'us-west-1',
    BUCKET: 'serverless-notes-app-upload-tutorial'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://bc62l1fot5.execute-api.us-east-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_CEbE9BJP9',
    APP_CLIENT_ID: '3hdv46hd16hsv8ph03mlgp4n0r',
    IDENTITY_POOL_ID: 'us-east-2:9185e791-01a3-49e5-a7d4-9f3c0eda1b99'
  }
}