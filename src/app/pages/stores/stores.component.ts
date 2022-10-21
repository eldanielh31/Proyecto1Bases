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
    console.log('save')
  }

  handleEdit() {
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }


}
