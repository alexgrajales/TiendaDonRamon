import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import * as firebase from "firebase";
import { User } from '../models/user';
import { } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GLOBALURLS } from '../app-global';

@Injectable()
export class AuthService 
{
  user: Observable<User>;
  constructor(
    private _http: Http,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,)
  {
    this.user = this.afAuth.authState.switchMap(user =>{
      if( user ){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();          
      }else{
        return Observable.of(null);
      }
    })
  }

  private oAuthLogin(provider){
      return this.afAuth.auth.signInWithPopup(provider).then(credentials=>{
        const user = credentials.user;
        this.afs.collection<User>('users', ref => ref.where('email', '==', user.email)).valueChanges().subscribe(data=>{
          if(!data.length){
            const newUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoUrl: user.photoURL,
              role: 'customer'
            }
            this.afs.collection('users').doc(user.uid).set(newUser).then(() => {
              this.router.navigate(['/shop'])
              return;
            })
          }

        })      
    })
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailAndPassword(email, password): Observable<any> {
    return this._http.post(GLOBALURLS().urlUsuario, {"email":email, "password": password})
        .map((response: Response) => { 
          return response.json();
        });    
    // return this.afAuth.auth.signInWithEmailAndPassword(email.value, password.value);
  }

  signUp(email, password): Observable<any> {
    return this._http.post(GLOBALURLS().urlUsuarios, {"email":email, "password": password})
        .map((response: Response) => { 
          return response.json();
        });    
  }

  signOut(){
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }
}
