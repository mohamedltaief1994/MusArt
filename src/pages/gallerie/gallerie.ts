import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the GalleriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallerie',
  templateUrl: 'gallerie.html',
})
export class GalleriePage {

  galleries = [] ;
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
    this.afDB.list('galleries/').snapshotChanges(['child_added']).subscribe(galleries => {
      galleries.forEach(gallerie => {
       console.log('Image: ' + gallerie.payload.exportVal().img);
        this.getImagesStorage(gallerie) ;
      });
    });
  }
  
  getImagesStorage(gallerie: any) {
    // pour récupérer l'URL des images
    const imgRef = gallerie.payload.exportVal().img;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.galleries.push({
        name: gallerie.payload.exportVal().name,
        arabe: gallerie.payload.exportVal().arabe, 
        tel: gallerie.payload.exportVal().tel, 
        description: gallerie.payload.exportVal().description, 
        url: imgUrl
      });
    });
  }
  desc (description:string,url:string){

    this.navCtrl.push("DescriptionPage",{description:description,url:url})
  }
  async getItems (evt:any){
    this.getImagesDatabase();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm){
      return ;
    }
    this.galleries = this.galleries.filter(currentGallerie =>{
      if (currentGallerie.name && searchTerm){
        return(currentGallerie.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
      }
    })
  }
  GoMuseum(){
    this.navCtrl.push(HomePage);
  }
  GoGallerie(){
    this.navCtrl.push(GalleriePage);
  }
}
