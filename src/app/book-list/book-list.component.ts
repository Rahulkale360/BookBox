import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { BookService } from "../services/book.service";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from "rxjs/operators";
import { ErrorMessages, Labels } from '../Helpers/constants';
@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"],
})
export class BookListComponent implements OnInit {
  private searchTerms = new Subject<string>();
  labels: Labels;
  
  books: any = [];
  gener: string;
  showLoader = false;
  navUrls = { prev: null, next: null };
  msg = "No Data Available";
  searchText: string;
  constructor(
    private bookService: BookService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();

    // observable to handle to search term.
    this.searchTerms
      .pipe(
        filter((text) => text.length >= 2),
        debounceTime(500), // wait 500ms after each keystroke before considering the term
        distinctUntilChanged(), // ignore new term if same as previous term
        // switch to new search observable each time the term changes
        switchMap((inputValue: string) => {
          return this.bookService.searchBooks(inputValue, this.gener);
        })
      )
      .subscribe((response: any) => {
        this.books = response.results;
        if(this.books.length == 0)
            this.msg = "No Data Available";
            
        this.showLoader = false;
      }, error =>{
        console.log(ErrorMessages.SOME_ERROR_OCCURED)
      });
  }

  //gets books from API
  getBooks() {
    this.showLoader = true;
    this.gener = this.router.snapshot.params["genere"];
    this.msg = "Loading..."
    this.bookService.getBooks(this.gener).subscribe((data: any) => {
      this.books = data.results;
      this.showLoader = false;
      this.navUrls.prev = data.previous;
      this.navUrls.next = data.next;
      console.log(this.books);
    }, error =>{
      console.log(ErrorMessages.SOME_ERROR_OCCURED)
    });
  }

  getImage(book: any) {
    return book.formats["image/jpeg"];
  }

  getBook(book) {
    for (let key in book) {
      let file = book[key];
      let fileExtension = file.split(".").pop(); // getting file extension.

      // display if viewbale version found
      if (fileExtension == "htm") {
        window.open(file, "_blank", "top=0,left=0,height=100%,width=auto");
        return;
      } else if (fileExtension == "pdf") {
        window.open(file, "_blank", "top=0,left=0,height=100%,width=auto");
        return;
      } else if (fileExtension == "txt") {
        window.open(file, "_blank", "top=0,left=0,height=100%,width=auto");
        return;
      }
    }

    alert(ErrorMessages.NO_VIEWABLE_VERSION);
  }

  //get books on search.
  search(): void {
    if (this.searchText) {
       if(this.searchText.length > 2) this.showLoader = true;
        this.books = [];
       this.searchTerms.next(this.searchText);

    } else {
      this.books = [];
      this.getBooks();
     } //get all the books if search text is empty;
  }

  navigate() {
    this.route.navigate(["home"]);
  }

  //load more books on scroll
  onScroll() {
    if (this.navUrls.next) {

      //consider search param if the search text is available on text box while scrolling.
      let paginateUrl = this.searchText ? this.navUrls.next + "&search="+ this.searchText 
      : this.navUrls.next;
      
      this.showLoader = true;
      this.bookService
        .loadMoreBooks(paginateUrl)
        .subscribe((data: any) => {
          this.showLoader = false;
          this.books = [...this.books, ...data.results];
          this.navUrls.prev = data.previous;
          this.navUrls.next = data.next;
        }, error =>{
          console.log(ErrorMessages.SOME_ERROR_OCCURED)
        });
    }
  }
}
