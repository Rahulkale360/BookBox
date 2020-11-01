import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor() { }

//returns the list of catogories of books.
getCatogories(){
  let catogories =[];
  catogories.push({img: "../../assets/images/Philosophy.svg", text: 'Fiction'});
  catogories.push({img: "../../assets/images/Fiction (1).svg", text: 'Philosophy'});
  catogories.push({img: "../../assets/images/Drama.svg", text: 'Drama'});
  catogories.push({img: "../../assets/images/History.svg", text: 'History'});
  catogories.push({img: "../../assets/images/Humour.svg", text: 'Humour'});
  catogories.push({img: "../../assets/images/Adventure.svg", text: 'Adventure'});  
  catogories.push({img: "../../assets/images/Politics.svg", text: 'Politics'});
  
  return catogories;
}

}
