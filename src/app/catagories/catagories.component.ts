import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {
  catogories :any= [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getCatogories();
  }

  // gets catogories
  getCatogories(){
    this.catogories = this.commonService.getCatogories();
  }

}
