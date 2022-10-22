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
  tempProduct = {};

  cost = null;

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
    
    let listData = ['costo']
    let dataToUpdate = [this.cost]
    
    let con = 0;

    dataToUpdate.forEach(element => {
      if (!(element === null || element === '')) {
        this.tempProduct[listData[con]] = element
      }
      con++;
    });

    this.backend.putProduct(this.tempProduct).subscribe(data => {
      console.log('Posteado correctamente')
    })

  }

  handleEdit(id: any){
    this.tempProduct = this.products.find(e=>e['nombre'] === id)
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

  handleDelete(name: any) {
    this.backend.deleteProduct(name).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }

}
