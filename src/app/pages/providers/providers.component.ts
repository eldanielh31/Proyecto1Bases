import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

declare let $: any;

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  // lista productos
  providers = [];

  newEmail = ''
  newContactName = ''
  newContactPhone = ''

  constructor(private localStorage: StorageService, private backend: BackendService) { }

  ngOnInit(): void {

    this.backend.getProviders().subscribe(
      response => {
        this.localStorage.saveData('providers', JSON.stringify(response))
      }
    )
    this.providers = JSON.parse(this.localStorage.getData('providers'))

  }

  handleSave() {
    console.log(this.newEmail, this.newContactPhone, this.newContactName)
  }

  handleEdit() {
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

}
