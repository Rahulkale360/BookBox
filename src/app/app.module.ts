import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { CatagoriesComponent } from './catagories/catagories.component';
import { BookListComponent } from './book-list/book-list.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoaderComponent } from './controls/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [		
    AppComponent,
    CatagoriesComponent,
    BookListComponent,
    TruncatePipe,
    LoaderComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
