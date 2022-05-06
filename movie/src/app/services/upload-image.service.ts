import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient, public cloudinary: Cloudinary) {}

  async uploadImageToCloudinary(title: string, image: string): Promise<any> {
    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', this.cloudinary.config().upload_preset);
    formData.append('cloud_name', this.cloudinary.config().cloud_name);
    formData.append('public_id', title.split('.').slice(0, -1).join('.'));

    const url = `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/image/upload`;

    return this.http.post<string>(url, formData).toPromise();
  }
}
