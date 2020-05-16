import { Component, Input } from '@angular/core';

@Component({
  selector: 'gro-favorite',
  templateUrl: 'favorite.component.html',
  styleUrls: ['favorite.component.scss']
})
export class GroFavoriteComponent {
@Input('favorites') favorites;
}
