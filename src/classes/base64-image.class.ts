interface base64 {
  data: string, // The original base64 data, without the data:image/jpeg;base64, appended to it.
}

/*
 * This allows for base64 images to be properly displayed in an Ionic app.
 */

export class Base64Image {

  private baseStart: string = "data:image/jpeg;base64,";
  public base64Data: string;

  constructor(image: base64) {
    this.base64Data = this.baseStart + image.data;
  }

}
