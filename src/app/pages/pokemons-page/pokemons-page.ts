import { ApplicationRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton.component/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sign } from 'crypto';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.html',
  styles: ``
})
export default class PokemonsPage  {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public isLoading = signal(true);
  public appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe( isStable => {
    // console.log({isStable});
  });

  // public currentpage = toSignal<number>(
  //   this.route.queryParamMap.pipe(
  //     map(params => params.get('page') ?? '1'),
  //     map(page => (isNaN(+page) ? 1 : +page)),
  //     map(page => Math.max(1, page)),
  //     tap(console.log)
  //   )
  // );

  public currentpage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)),
      tap(console.log)
    )
  );


  // ngOnInit(): void {
  //   // this.route.queryParamMap.subscribe(console.log);
  //   console.log(this.currentpage());
  //   this.loadPokemons(0);
  //   setTimeout(() => {
  //     this.isLoading.set(false);
  //   }, 1500);
  // }

  public loadOnPageChanged = effect(() => {
    console.log('Current page changed to:', this.currentpage());
    this.loadPokemons(this.currentpage());
  },
  {
    allowSignalWrites: true
  });


public get safeCurrentPage(): number {
  const page = this.currentpage();
  if (typeof page !== 'number' || isNaN(page) || page < 1) {
    return 1;
  }
  return page;
}



  public loadPokemons(page : number = 0){
    const pageToLoad = this.currentpage()! + page;
    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      // tap(() => this.router.navigate([], { queryParams: { page : pageToLoad }})), // [] quedate en la misma ruta, 'page' y Agrega o actualiza el parámetro ?page=valor en la URL. y
      tap(() => this.title.setTitle(`Pokemons SSR - Página ${pageToLoad}`))
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons);
    });
  }

}
