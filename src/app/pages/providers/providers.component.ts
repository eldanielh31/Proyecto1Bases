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
  tempProvider = {}

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
    let listData = ['email', 'contacto_nombre', 'contacto_numero']
    let dataToUpdate = [this.newEmail, this.newContactPhone, this.newContactName]

    let con = 0;

    dataToUpdate.forEach(element => {
      if (!(element === null || element === '')) {
        this.tempProvider[listData[con]] = element
      }
      con++;
    });

    this.backend.putProvider(this.tempProvider).subscribe(data => {
      console.log('Posteado correctamente')
    })

  }

  handleEdit(id:any) {
    this.tempProvider = this.providers.find(e => e['proveedor_id'] === id)
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

  handleDelete(id: number) {
    this.backend.deleteProvider(id).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }

}
