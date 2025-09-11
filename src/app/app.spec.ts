import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component/navbar.component';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let compiled: HTMLElement;

  @Component({
    selector: 'navbar',
    standalone: true,
    template: '<nav>Mock Navbar</nav>'
  })
  class NavBarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    })
    .overrideComponent(App, {
      add: {
        imports: [NavBarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    expect(compiled.querySelector('navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(App);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
