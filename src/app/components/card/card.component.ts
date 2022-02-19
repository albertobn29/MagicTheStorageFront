import { MagicServiceService } from './../../services/magic-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CardComponent implements OnInit {
  @Input() origen: any;
  @Input() name: any;
  @Input() imgUrl: any;
  @Input() id: any;
  @Input() mazo_id: any;
  @Input() set: any;
  @Input() setName: any;
  @Input() cantidad: any;
  mensaje: any = '';
  colores: any = null;
  cardData: any = {};
  mazos: any;

  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private serviceMagic: MagicServiceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  /**
   * Función para mostrar carta en detalle
   */
  showCard(id: string) {
    this.router.navigate(['carta', id]);
  }

  /**
   * Funcion para almacenar las cartas en la coleccion del usuario
   * @param cantidad
   * @param foil
   * @param id
   */
  storeCard(cantidad: any, id: string, name: string) {
    var user_id = sessionStorage.getItem('user_id');
    if (!isNaN(Number(cantidad))) {
      var cantidadNum = Number(cantidad);
      this.serviceMagic.getCardById(id).subscribe((data) => {
        this.cardData = {
          user_id: user_id,
          multiverseid: id,
          nombre: name,
          cantidad: cantidadNum,
          color: this.getColores(data.card.colors),
        };
        this.serviceMagic.storeCard(this.cardData).subscribe((data) => {
          if (data.msg) {
            this.mensaje = data.msg;
          } else if (data.correcto) {
            this.mensaje = data.correcto;
          }
        });
      });
    } else {
      this.mensaje = 'La cantidad debe de ser un número'
    }
  }

  /**
   * Función que abre el modal de regitro de carta
   * @param content
   */
  open(content: any) {
    if(content._declarationTContainer.localNames[0] == 'mazoModal'){
      this.serviceMagic.getMazos().subscribe((data: any) => {
        this.mazos = data.mazos;
        this.modalService.open(content);
      });
    } else {
      this.modalService.open(content);
    }
  }

  /**
   * Funcion que recoge un array de colores en ingles y devuelve un string con los colores en español
   * @param colores
   * @returns String
   */
  getColores(colores: any): string {
    var coloresEsp = '';
    var colorEs;
    colores.forEach((colorIng: string) => {
      switch (colorIng) {
        case 'Red':
          colorEs = 'Rojo';
          break;
        case 'Blue':
          colorEs = 'Azul';
          break;
        case 'Green':
          colorEs = 'Verde';
          break;
        case 'White':
          colorEs = 'Blanco';
          break;
        case 'Black':
          colorEs = 'Negro';
          break;
        default:
          colorEs = 'FALLO';
      }
      if (coloresEsp == '') {
        coloresEsp = colorEs;
      } else {
        coloresEsp = coloresEsp + ', ' + colorEs;
      }
    });
    return coloresEsp;
  }

  /**
   * Añade la carta al mazo
   * @param card_id
   * @param mazo_id
   */
  addCardToMazo(card_id: any, mazo_id: any){
    this.serviceMagic.addCarta(card_id,mazo_id).subscribe((data: any)=>{
      if (data.msg) {
        this.mensaje = data.msg;
      } else if (data.correcto) {
        this.mensaje = data.correcto;
      }
    })
  }

  borrarFromMazo(card_id: any, mazo_id: any){
    this.serviceMagic.borrarFromMazo(card_id,mazo_id).subscribe((data: any)=>{
      if (data.msg) {
        this.mensaje = data.msg;
      } else if (data.correcto) {
        this.mensaje = data.correcto;
      }
    })
  }
}
