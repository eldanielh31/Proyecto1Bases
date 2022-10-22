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
  tempWash = {};
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
    
    let listData = ['costo', 'duracion', 'puntos_redimir', 'puntos_otorga', 'precio']
    let dataToUpdate = [this.newCost, this.newDuration, this.newExchange, this.newPoints, this.newPrice]

    let con = 0;

    dataToUpdate.forEach(element => {
      if (!(element === null || element === '')) {
        this.tempWash[listData[con]] = element
      }
      con++;
    });

    this.backend.putWash(this.tempWash).subscribe(data => {
      console.log('Posteado correctamente')
    })

  }

  //funcion para abrir el modal
  handleEdit(id:any) {
    this.tempWash = this.wash.find(e => e['lavado_id'] === id)
    $("#myModal").modal("show");
    $(".modal-title").text("New Cost");
  }

  handleDelete(id: number) {
    this.backend.deleteWash(id).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }

}
