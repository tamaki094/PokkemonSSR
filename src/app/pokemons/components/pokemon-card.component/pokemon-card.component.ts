import { Component, computed, effect, input, Input, InputSignal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  styles: ``
})
export class PokemonCardComponent {
  // @Input() name! :string;  ////manera vieja
  public pokemon :InputSignal<SimplePokemon> = input.required<SimplePokemon>();


  logEffect = effect(() => {
    console.log('Pokemon Card: ', this.pokemon());
  }); //se disparara cada que el input cambie la señal

  get imageUrl(): string {
    return `https://img.pokemondb.net/sprites/x-y/normal/${this.pokemon().name.toLowerCase()}.png`;
  }

  public readonly pokemonImge = computed(
    () => `https://img.pokemondb.net/sprites/x-y/normal/${this.pokemon().name.toLowerCase()}.png`
  );



}
