const dev = {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-app-2-api-dev-attachmentsbucket-12gh851ieq4qw'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://ddfj6f1ugf.execute-api.us-east-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_e1IxKqLbD',
    APP_CLIENT_ID: '18j3uioqpqvfevkdthh5j5h9t1',
    IDENTITY_POOL_ID: 'us-east-2:20519950-5193-4dc1-95d0-20d0bc8acdff'
  }
}

const prod = {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-app-2-api-prod-attachmentsbucket-s3v4jkg66x7z'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://krtdwp132f.execute-api.us-east-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_Maa9nV2xZ',
    APP_CLIENT_ID: '6ac9chtmg2gim6hsu0pv4cv9f2',
    IDENTITY_POOL_ID: 'us-east-2:d93ff323-8700-42c2-8027-c1811863d942'
  }
}

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}

