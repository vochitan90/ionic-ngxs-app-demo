import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

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
    const uid = title + '_' + uuidv4();
    formData.append('public_id', uid);

    const url = `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/image/upload`;

    return this.http.post<string>(url, formData).toPromise();
  }
}