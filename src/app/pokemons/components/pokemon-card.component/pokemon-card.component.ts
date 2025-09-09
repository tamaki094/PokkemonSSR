import { Component, Input } from '@angular/core';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styles: ``
})
export class PokemonCardComponent {
  @Input() name! :string;

  get imageUrl(): string {
    return `https://img.pokemondb.net/sprites/x-y/normal/${this.name.toLowerCase()}.png`;
  }


}
