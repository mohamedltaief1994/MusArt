import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage' ;
//import * as firebase from 'firebase/app'
//import "firebase/firestore" ;
/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  public museums: AngularFireList<any> ;
 public desc:string; 
 public url:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage) {
    this.url=this.navParams.get('url');
    this.desc=this.navParams.get('description');
     // console.log(this.desc)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
  }
}


