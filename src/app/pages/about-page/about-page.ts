import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [
    CommonModule],
  templateUrl: './about-page.html',
  styles: ``
})
export default class AboutPage implements OnInit {

   private title = inject(Title);
   private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'This is the about page'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'about page'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola mundo!'
    });

  }

}
