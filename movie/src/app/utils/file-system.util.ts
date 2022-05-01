import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

const IMAGE_DIR = 'stored-images';

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

export class FileSytemUtil {
  images: LocalFile[] = [];
  image: LocalFile;

  fileName = '';

  get getImages() {
    return this.images;
  }

  get getImage() {
    return this.image;
  }

  get getFileName() {
    return this.fileName;
  }

  constructor(
    private plt: Platform,
    private loadingController: LoadingController
  ) {}

  /// BEGIN TAKE AND SAVE PHOTO TO FILESYSTEM

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 60,
      //allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      return this.saveImage(image);
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    this.fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${this.fileName}`,
      data: base64Data as string,
      directory: Directory.Data,
    });

    return {
      filepath: this.fileName,
      webviewPath: photo.webPath,
      base64Data: base64Data,
    };
  }

  // https://ionicframework.com/docs/angular/your-first-app/saving-photos
  private async readAsBase64(photo: Photo) {
    // if (this.plt.is('hybrid')) {
    //   try {
    //     const file = await Filesystem.readFile({
    //       path: photo.path,
    //     });

    //     Filesystem.readFile({
    //       path: photo.path,
    //     }).then(
    //       (file) => {
    //         console.log('data:', file);
    //         return file.data;
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   // Fetch the photo, read as a blob, then convert to base64 format
    //   const response = await fetch(photo.webPath);
    //   const blob = await response.blob();

    //   return await this.convertBlobToBase64(blob);
    // }

    // Fetch the photo, read as a blob, then convert to base64 format

    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  /// END TAKE AND SAVE PHOTO TO FILE-SYSTEM

  // BEGIN LOAD FILE FROM FILE-SYSTEM
  async loadFiles() {
    this.images = []; // reset then load file

    const loading = await this.loadingController.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    })
      .then(
        async (result) => {
          return await this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let fileName of fileNames) {
      const filePath = `${IMAGE_DIR}/${fileName}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: fileName,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }

    return this.images;
  }

  async loadSingleFileByName(fileName: string) {
    const filePath = `${IMAGE_DIR}/${fileName}`;

    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
    });

    return `data:image/jpeg;base64,${readFile.data}`;
  }
}
