import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleriePage } from './gallerie';

@NgModule({
  declarations: [
    GalleriePage,
  ],
  imports: [
    IonicPageModule.forChild(GalleriePage),
  ],
})
export class GalleriePageModule {}
