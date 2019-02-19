import { File } from '@ionic-native/file';

interface newVideo {
  videoData: any;
}

/*
 * This allows us to transform a local video file URI to a base64 video.
 */
export class Base64Video {

  public base64Ready: Promise<any>;

  private videoBaseStart: string = "data:video/mp4;base64,";
  public base64Data: string;

  constructor(video: newVideo, private file: File) {
    this.base64Ready = new Promise((resolve) => {
      this.convertVideoToBase64(video.videoData).then(() => {
        resolve(undefined);
      });
    });
  }

  /*
   * Reads the fileURI, uses FileReader() to encode it to base64, and then we have to fix it,
   * because FileReader() sucks. Only videos have this issues.
   */
  private async convertVideoToBase64(video) {
    return new Promise(async (resolve) => {
      let res:any = await this.file.resolveLocalFilesystemUrl(video);
      res.file((resFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(resFile);
        reader.onloadend = async (evt: any) => {
          resolve(await this.fixVideoEncoding(evt));
        }
      });
    });
  }

  /*
   * File reader provides us with an incorrectly encoded base64 string.
   * So we have to fix it, in order to upload it correctly.
   */
  private fixVideoEncoding(evt: any) {
    return new Promise(async (resolve) => {
      let OriginalBase64 = evt.target.result.split(',')[1]; // Remove the "data:video..." string.
      let decodedBase64 = await atob(OriginalBase64); // Decode the incorrectly encoded base64 string.
      let encodedBase64 = await btoa(decodedBase64); // re-encode the base64 string (correctly).
      this.base64Data = this.videoBaseStart + encodedBase64;
      resolve(await this.base64Data);
    });
  }

}
