import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl:ToastController,
    private dishservice: DishProvider,private Favoriteservice: FavoriteProvider,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    });
  }
  addToFavorites(dish:Dish)
  {
    console.log('adding to favorites ',dish.id);
    this.Favoriteservice.addFavorite(dish.id);
    this.toastCtrl.create({
      message:"dish" +dish.id+'added as a favorite successfully',
      position:'middle',
      duration:3000,

    }).present();
  }


}
