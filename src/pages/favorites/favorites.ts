import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ItemSliding } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { baseURL } from '../../shared/baseurl';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorite:Dish[];
  errMess:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private favoriteservics:FavoriteProvider,
  @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.favoriteservics.getFavorites()
    .subscribe(favorites=>this.favorite=favorites,
    errmess=>this.errMess=errmess)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
deleteFavorite(item:ItemSliding,id:number){
  console.log('delete',id);
  this.favoriteservics.deleteFavorites(id)
  .subscribe(favorites=>this.favorite=favorites,
    errmess=>this.errMess=errmess)
  item.close();
}
}
