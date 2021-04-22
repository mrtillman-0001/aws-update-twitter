# aws-update-twitter

An AWS Lambda function to update your Twitter icon

## Checklist

1. Twitter account
    - username + password
2. AWS account
    - sign in as an IAM user
    - must have access key ID and secret access key
    - configure AWS CLI
3. AWS Secrets Manager secret named `twitter/login`
    - type: Other
    - key: username, value: your Twitter username
    - key: password, value: your Twitter password
4. AWS Lambda function named `update-twitter`
    - set Timeout to 1 minute
    - must have IAM role assigned that includes:
      - `AmazonS3FullAccess`
      - `SecretsManagerReadWrite`
      - `CloudWatchLogsFullAccess`

## Installation

```sh
$ git clone https://github.com/mrtillman/aws-update-twitter.git
$ cd aws-update-twitter
$ npm install
```

## Usage

```sh
# zip code + dependencies
$ npm run zip

# deploy to AWS Lambda
$ npm run deploy
```

### EventBridge Rule

|Setting|Description|
|---|---|
|Event schedule | Cron expression: `0 10 * * ? *`|
|Target | Lambda function: `update-twitter`|

### SNS Topic

|Setting|Description|
|---|---|
|Endpoint|Your email address|
|Name| `twitter-updates`|
|Protocol|Email|
|Type| Standard|

### CloudWatch Alarm

|Setting|Description|
|---|---|
|FunctionName|update-twitter|
|Metric name|Errors|
|Notification Action|When in alarm, send message to topic "twitter-updates"|
|Statistic|Sum|
|Threshold|Errors >= 1 for 1 datapoints within 5 minutes|
|Type|Metric|

## Sources

[AWSJavaScriptSDK | Class: AWS.S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

[NodeJS Twitter private API client](https://github.com/dilame/twitter-private-api)
- [Class: AccountRepository](https://github.com/dilame/twitter-private-api/blob/master/docs/classes/_repositories_account_repository_.accountrepository.md#changeprofilepicture)
- [Class: PublishService](https://github.com/dilame/twitter-private-api/blob/master/docs/classes/_services_publish_service_.publishservice.md#photo)


## License

[MIT](https://github.com/mrtillman/aws-update-twitter/blob/main/LICENSE)