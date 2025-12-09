import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";


@Injectable({
  providedIn: 'root',
})
export class AzureBlobService {
  private storageAccount = 'sahan';
  private containerName = 'complaint-images';
  private sasToken = 'sp=racwdl&st=2025-12-05T08:15:28Z&se=2027-12-05T16:30:28Z&spr=https&sv=2024-11-04&sr=c&sig=JBqfyR7N4v1UMyeIR9IJvsz3eWhrpLQtC8wNS8tyL%2Bc%3D';
  
  constructor() { }
  
  private getContainerClient(): ContainerClient {
    return new BlobServiceClient(
      `https://${this.storageAccount}.blob.core.windows.net/?${this.sasToken}`
    ).getContainerClient(this.containerName);
  }

  async uploadFile(file: Blob, fileName: string): Promise<string> {
    const container = this.getContainerClient();
    const blobClient = container.getBlockBlobClient(fileName);

    await blobClient.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type }
    });

    return fileName; 
  }

  async deleteFile(fileName: string): Promise<boolean> {
    const container = this.getContainerClient();

    try {
      await container.deleteBlob(fileName);
      return true;
    } catch (err) {
      console.error("Failed to delete blob:", err);
      return false;
    }
  }
}