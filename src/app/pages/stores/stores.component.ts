import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

declare let $: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  // lista productos
  stores = [];
  tempStore = {}

  newPhone = '';
  newManager = '';

  constructor(private localStorage: StorageService, private backend: BackendService) { }

  ngOnInit(): void {

    this.backend.getStores().subscribe(
      response => {
        this.localStorage.saveData('stores', JSON.stringify(response))
      }
    )
    this.stores = JSON.parse(this.localStorage.getData('stores'))

  }

  handleSave() {
    
    let listData = ['telefono', 'gerente_id']
    let dataToUpdate = [this.newPhone, this.newManager]

    let con = 0;

    dataToUpdate.forEach(element => {
      if (!(element === null || element === '')) {
        this.tempStore[listData[con]] = element
      }
      con++;
    });

    this.backend.putStore(this.tempStore).subscribe(data => {
      console.log('Posteado correctamente')
    })

  }

  handleEdit(id:any) {
    this.tempStore = this.stores.find(e => e['suc_id'] === id)
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

  handleDelete(id: number) {
    this.backend.deleteStore(id).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }


}
