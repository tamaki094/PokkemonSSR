import { ApplicationRef, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list.component/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton.component/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.html',
  styles: ``
})
export default class PokemonsPage implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  public isLoading = signal(true);
  public appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe( isStable => {
    // console.log({isStable});
  });

  ngOnInit(): void {
    this.loadPokemons(0);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  public loadPokemons(nextPage : number = 0){
    this.pokemonsService.loadPage(nextPage)
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
      });
  }

}
