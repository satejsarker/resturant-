import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ItemSliding ,ToastController,LoadingController,AlertController} from 'ionic-angular';
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
  private favoriteservics:FavoriteProvider, private toastCtrl:ToastController,
  private loadingCtrl:LoadingController,private alertCtrl:AlertController,
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
  let alert=this.alertCtrl.create({
  title:"confarmation ",
  message:"do you wnat to delete "+ id,
  buttons:[
    {
    text:"cancel",
    role:'cancel',
    handler:()=>{
      console.log("delete cnacelled");
    }
    },
    {
     text:'delete',
     handler:()=>{
      let loading=this.loadingCtrl.create({
        content:'deleting ...'
        });
        let toast=this.toastCtrl.create({
          message:"dish "+id +"deleted successfully ",
          duration:3000
        });
        loading.present();
        this.favoriteservics.deleteFavorites(id)
        .subscribe(favorites=>{this.favorite=favorites;loading.dismiss(); toast.present();},
          errmess=>{this.errMess=errmess;loading.present()});

     }

    }
  ]
  });

  alert.present();

  item.close();
}
}
