import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleclick(){
    this.router.navigate(['/tables'])
  }

}

