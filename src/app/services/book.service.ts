import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "../Helpers/constants";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(gener: string) {
    return this.http.get(APIs.GET_BOOKS+"&topic="+gener);
  }

  searchBooks(searchTerm: string, gener: string){
    return this.http.get(APIs.GET_BOOKS+"&topic="+gener+"&search="+searchTerm);
  }

  loadMoreBooks(url: string){
    return this.http.get(url);
  }
}
