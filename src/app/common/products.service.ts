import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import * as faker from "faker";
import { Product } from "../models/product";
import { promise } from 'protractor';
import { UploadService } from "@admin/upload.service";
import { Upload } from "app/models/upload";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/Observable/fromPromise";
import { expand, takeWhile, mergeMap, take } from "rxjs/operators";


type productCollection = AngularFirestoreCollection<Product[]>;
type producDocument = AngularFirestoreDocument<Product>;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private afs: AngularFirestore,
    private uploadService : UploadService
  ) { }

  products(): productCollection{
    return this.afs.collection<Product[]>('products');
  }

  product(id: string): producDocument{
    return this.afs.doc<Product>(`products/${id}`);
  }

  save(product: Product): Promise<any>{
    product.id = faker.random.alphaNumeric(16);
    return this.products().doc(product.id).set(Object.assign({}, product));
  }

  update(product : Product): Promise<any>{
    return this.product(product.id).update(Object.assign({}, product));
  }

  getProductImages(productId: string){
    return this.afs.doc<Product>(`products/${productId}`).collection('uploads');

  }

  // remove(id): Promise<any>{
  //   let ref = this.product(id);
  //   return new Promise((resolve, reject)=>{
  //     return ref.collection<Upload>('uploads').valueChanges().subscribe((files)=>{
  //       if(files){
  //         files.forEach((file:Upload)=>{
  //           this.uploadService.removeFile(file.id).then(()=>{
  //             this.afs.doc(`products/${id}/uploads/${file.id}`).delete();
  //           }).catch((error=>{}));
  //         });
  //       }
  //       ref.delete().then(()=>{
  //         resolve(true);
  //       }).catch(error=>{
  //         reject(error);
  //       })
  //     })
  //   })
    
  // }

  remove(id): Promise<any>{
    let ref = this.product(id);
    return new Promise((resolve, reject)=>{
      this.deleteUploadsCollection(`products/${id}/uploads`, 1).subscribe(()=>{
        ref.delete().then(() =>{
          resolve(true);
        }).catch(error=>{
          reject(error);
        })
      })
    })

  }

  private deleteUploadsCollection(path: string, limit: number): Observable<any>{
    const source = this.deleteBatch(path, limit)
    return source.pipe(
      expand(val=> this.deleteBatch(path, limit)),
      takeWhile(val=> val >0)
    )
  }

  private deleteBatch(path: string, limit: number): Observable<any>{
    const ref = this.afs.collection(path, ref => ref.orderBy('__name__').limit(limit));
    return ref.snapshotChanges().pipe(
      take(1),
      mergeMap(snapshot => {
        const batch = this.afs.firestore.batch();
        snapshot.forEach(doc=>{
          this.uploadService.removeFile(doc.payload.doc.id);
          batch.delete(doc.payload.doc.ref);
        });
        return fromPromise(batch.commit()).map(()=> snapshot.length)
      })
    )
  }
}
