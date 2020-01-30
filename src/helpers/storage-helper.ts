import * as azureStorage from 'azure-storage';
// tslint:disable-next-line: no-var-requires
const getStream = require('into-stream');
export class StorageHelper {
  public azureStorageConfig = {
    accountKey:
      'ydoD5vJu66MnXekPhe81RJEh0O9j6nl1545NG65/V9bIMWEVoofISSjx9Ux52rC51sSNKFJZAaqf9fS+77j7Dw==',
    accountName: 'pilastorage',
    blobURL: 'https://pilastorage.blob.core.windows.net',
    containerName: 'pila-blob-container',
  };

  public createSharedAccessSignature(containerName, blobName) {
    const blobService = azureStorage.createBlobService();

    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 100);
    startDate.setMinutes(startDate.getMinutes() - 100);
    const sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.READ,
        Start: startDate,
        // tslint:disable-next-line: object-literal-sort-keys
        Expiry: expiryDate,
      },
    };
    const token = blobService.generateSharedAccessSignature(
      containerName,
      blobName,
      sharedAccessPolicy
    );
    const sasUrl = blobService.getUrl(containerName, blobName, token);
  }

  public uploadFileToBlob(directoryPath, file, fileName) {
    return new Promise((resolve, reject) => {
      const blobName = this.getBlobName(file.originalname);
      const stream = getStream(file.buffer);
      const streamLength = file.buffer.length;

      const blobService = azureStorage.createBlobService(
        this.azureStorageConfig.accountName,
        this.azureStorageConfig.accountKey
      );
      blobService.createBlockBlobFromStream(
        this.azureStorageConfig.containerName,
        `${directoryPath}/${fileName}`,
        stream,
        streamLength,
        err => {
          if (err) {
            reject(err);
          } else {
            resolve({
              filename: blobName,
              originalname: file.originalname,
              path: `${this.azureStorageConfig.containerName}/${directoryPath}/${fileName}`,
              size: streamLength,
              url: `${this.azureStorageConfig.blobURL}/${this.azureStorageConfig.containerName}/${directoryPath}/${fileName}`,
            });
          }
        }
      );
    });
  }

  private getBlobName(originalName) {
    const identifier = Math.random()
      .toString()
      .replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
  }
}
