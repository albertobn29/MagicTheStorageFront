import { Component, OnInit } from '@angular/core';
import { MagicServiceService } from '../../services/magic-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mazos',
  templateUrl: './mazos.component.html',
  styleUrls: ['./mazos.component.css'],
})
export class MazosComponent implements OnInit {

  response: any;
  page = 1;
  pageSize = 9;
  vacio = '';
  mensaje: any;

  constructor(
    private router: Router,
    private magicService: MagicServiceService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.magicService.getMazos().subscribe((data: any) => {
      this.response = data.mazos;
      console.log(data);
    });
  }

  /**
   * Función que abre el modal de regitro de mazo
   * @param content
   */
  open(content: any) {
    this.modalService.open(content);
  }

  createMazo(nombre: any) {
    this.magicService.createMazo(nombre).subscribe((data: any) => {
      if (data.msg) {
        this.mensaje = data.msg;
      } else if (data.correcto) {
        this.mensaje = data.correcto;
      }
      console.log(data);
      this.magicService.getMazos().subscribe((data: any) => {
        this.response = data.mazos;
        console.log(data);
      });
    });
  }

  showMazo(id: any){
    this.router.navigate(['mazo', id])
  }

}
