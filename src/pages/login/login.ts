import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase' ;
import {FacebookLoginResponse, Facebook } from '@ionic-native/facebook';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth,private fb: Facebook) {
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
loginFacebook(){
  this.fb.login(['public_profile','email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));
}
}
