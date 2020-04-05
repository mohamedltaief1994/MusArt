import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  museums = [] ;
  public text:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage) {
      this.getImagesDatabase();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  getImagesDatabase() {
      // pour récupérer les informations des images
    this.afDB.list('museums/').snapshotChanges(['child_added']).subscribe(museums => {
      museums.forEach(museum => {
      // console.log('Image: ' + museum.payload.exportVal().img);
        this.getImagesStorage(museum) ;
      });
    });
  }
  
  getImagesStorage(museum: any) {
    // pour récupérer l'URL des images
    const imgRef = museum.payload.exportVal().img;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      //console.log(imgUrl);
      this.museums.push({
        name: museum.payload.exportVal().name,
        arabe: museum.payload.exportVal().arabe, 
        tel: museum.payload.exportVal().tel, 
        description: museum.payload.exportVal().description, 
        url: imgUrl
      });
    });
  }
  desc (description:string,url:string){

    this.navCtrl.push("DescriptionPage",{description:description,url:url})
  }

}
