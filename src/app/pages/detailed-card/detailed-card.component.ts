import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagicServiceService } from '../../services/magic-service.service';

@Component({
  selector: 'app-detailed-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.css'],
})
export class DetailedCardComponent implements OnInit {
  cardId: any;
  cardInfo: any;
  colores: any;
  descripcionSplit: any;

  constructor(
    private route: ActivatedRoute,
    private magicService: MagicServiceService
  ) {
    this.cardId = this.route.snapshot.params['id'];
  }

  /**
   * Función que se llama en cuanto se carga el componente,
   * obtiene toda la información de la carta a mostrar
   */
  ngOnInit(): void {
    this.magicService.getCardById(this.cardId).subscribe((data) => {
      this.cardInfo = data;
      this.colores = this.getColores(this.cardInfo.card.colors);
      this.descripcionSplit = this.getDescription(
        this.cardInfo.card.foreignNames[1].text
      );
    });
  }

  /**
   *Funcion que recoge un array de colores en ingles y devuelve un string con los colores en español
   * @param colores
   * @returns String
   */
  getColores(colores: any): String {
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
   * Función que recoge un string y lo devuelve en un array separado por los puntos
   * @param descripcion
   * @returns
   */
  getDescription(descripcion: String) {
    var descripciones = [];
    descripciones = descripcion.split('.');
    return descripciones;
  }
}
