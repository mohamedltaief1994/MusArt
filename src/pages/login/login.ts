import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase' ;
import { AngularFireDatabase } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
//import {FacebookLoginResponse, Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth,
     public afDB: AngularFireDatabase,
     private fb: Facebook,
     public platform: Platform     /*private fb: Facebook*/) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async login(user: User) {
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    if (result){
      this.navCtrl.setRoot('HomePage');
    }
  }
    catch(e){
      console.error(e);
    }
  }
register (){

  this.navCtrl.push('RegisterPage')
}
facebookCordova() {
  this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        console.log('Info Facebook: ' + JSON.stringify(success));
             this.navCtrl.push('HomePage');
            this.afDB.object('Users/' + success.user.uid).set({
              displayName: success.user.displayName,
              photoURL: success.user.photoURL});
      }).catch((error) => {
          console.log('Erreur: ' + JSON.stringify(error));
      });
  }).catch((error) => { console.log(error); });
}
facebookWeb() {
  this.afAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      console.log('Info Facebook: ' + JSON.stringify(success));
      this.navCtrl.push('HomePage');
      this.afDB.object('Users/' + success.user.uid).set({
        displayName: success.user.displayName,
        photoURL: success.user.photoURL
      });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
}

facebookLogin() {
  if (this.platform.is('cordova')) {
    console.log('PLateforme cordova');
    this.facebookCordova();
  } else {
    console.log('PLateforme Web');
    this.facebookWeb();
  }
}

loginGoogle() {
  const result = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
    console.log(res);
    if (result){
      this.navCtrl.setRoot('HomePage');
    }
  })
}
/* loginFacebook() {
  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
    console.log(res);
  })
}
loginFacebook(){
  this.fb.login(['public_profile','email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));
}*/
}
