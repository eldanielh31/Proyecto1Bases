import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';


declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // lista productos
  products = [];

  constructor(private localStorage: StorageService, private backend: BackendService) { }

  ngOnInit(): void {

    this.backend.getProducts().subscribe(
      response => {
        this.localStorage.saveData('products', JSON.stringify(response))
      }
    )
    this.products = JSON.parse(this.localStorage.getData('products'))

  }

  handleSave(){
    console.log('save')
  }

  handleEdit(){
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

}
