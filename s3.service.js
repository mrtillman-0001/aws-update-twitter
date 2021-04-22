const {
  S3Client,
  DeleteObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");

class S3Service {
  constructor() {
    this._bucketName = "icons.avatarbox.io.seed";
    this._client = new S3Client({
      region: 'us-east-1',
    });
  }

  async deleteObject(Key){
    // TODO: delete object versions
    const command = new DeleteObjectCommand({
      Bucket: this._bucketName,
      Key
    });
    return await this._client.send(command);
  }

  async listObjects() {
    const command = new ListObjectsCommand({
      Bucket: this._bucketName
    })
    const result = await this._client.send(command);
    return result.Contents;
  }
  
}

module.exports = { S3Service };
