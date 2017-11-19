import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';


/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl:ToastController,
    @Inject('BaseURL') private BaseURL,private Favoriteservice:FavoriteProvider) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    this.favorite=this.Favoriteservice.isFavorite(this.dish.id)
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorites()
{
  console.log('adding to favorites ',this.dish.id);
  this.favorite=this.Favoriteservice.addFavorite(this.dish.id);
  this.toastCtrl.create({
    message:"dish" +this.dish.id+'added as a favorite successfully',
    duration:3000,

  }).present();
}
}
