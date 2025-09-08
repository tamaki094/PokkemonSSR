import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styles: ``
})
export default class PricingPage implements OnInit {

   private title = inject(Title);
   private meta = inject(Meta);
   private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    // this.title.setTitle('Pricing Page');
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'This is the Pricing page'
    // });
    // this.meta.updateTag({
    //   name: 'og:title',
    //   content: 'Contact page'
    // });
    // this.meta.updateTag({
    //   name: 'keywords',
    //   content: 'Hola mundo!'
    // });

    document.title = 'Pricing Page';
    console.log({hola :'mundo'});
    console.log(this.platform);

    console.log(isPlatformBrowser(this.platform));

    if(!isPlatformServer(this.platform)){
      document.title = 'Pricing Page';
    }

  }

}

