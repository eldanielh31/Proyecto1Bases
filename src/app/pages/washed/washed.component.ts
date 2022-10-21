import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

declare let $ : any;

@Component({
  selector: 'app-washed',
  templateUrl: './washed.component.html',
  styleUrls: ['./washed.component.css']
})
export class WashedComponent implements OnInit {

  // lista productos
  wash = [];
  newCost = ''
  newPrice = ''
  newDuration = ''
  newPoints = ''
  newExchange = ''

  constructor(private localStorage: StorageService, private backend: BackendService) { }

  ngOnInit(): void {

    //Llamado base de datos
    this.backend.getWash().subscribe(
      response => {
        this.localStorage.saveData('wash', JSON.stringify(response))
      }
    )
    this.wash = JSON.parse(this.localStorage.getData('wash'))

  }

  //funcion para actualizar
  handleSave() {
    console.log('save')
  }

  //funcion para abrir el modal
  handleEdit() {
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

}
