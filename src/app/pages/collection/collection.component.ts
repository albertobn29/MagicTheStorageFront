import { Component, OnInit } from '@angular/core';
import { MagicServiceService } from '../../services/magic-service.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  response: any;
  page = 1;
  pageSize = 6;
  vacio = '';
  origen='coleccion'

  constructor(private magicService: MagicServiceService) {}

  /**
   * Función que se ejecuta caundo el componente se carga
   * Obtiene la información de las cartas del usuario a mostrar
   */
  ngOnInit(): void {
    this.magicService.getCardsByUser().subscribe((data) => {
      var cartasBD: any = data;
      var cartasShow: Array<any> = [];
      cartasBD.cards.forEach((cartabd: any) => {
        this.magicService
          .getCardById(cartabd.multiverseid)
          .subscribe((data) => {
            var carta: any = data.card;
            var cartaInf;
            carta.foreignNames.forEach((idioma: any) => {
              if (idioma.language == 'Spanish') {
                if (idioma.imageUrl == null) {
                  idioma.imageUrl =
                    'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=100152&type=card';
                }
                cartaInf = {
                  nombre: idioma.name,
                  id: carta.multiverseid,
                  set: carta.set,
                  setName: carta.setName,
                  imagen: idioma.imageUrl,
                  cantidad: cartabd.cantidad,
                };
                cartasShow.push(cartaInf);
              }
            });
          });
      });
      this.response = cartasShow;
    });
  }

  /**
   * Funcion que recibe un nombre por parametros, y busca si existen cartas con un nombre parecido
   * dentro de la colección del usuario, y obtiene la información necesaria.
   */
  getUserCardsByName(name: string) {
    this.magicService.getUserCardsByName(name).subscribe((data) => {
      var cartasBD: any = data;
      var cartasShow: Array<any> = [];
      cartasBD.cards.forEach((cartabd: any) => {
        this.magicService
          .getCardById(cartabd.multiverseid)
          .subscribe((data) => {
            var carta = data.card;
            var cartaInf;
            carta.foreignNames.forEach((idioma: any) => {
              if (idioma.language == 'Spanish') {
                if (idioma.imageUrl == null) {
                  idioma.imageUrl =
                    'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=100152&type=card';
                }
                cartaInf = {
                  nombre: idioma.name,
                  id: carta.multiverseid,
                  set: carta.set,
                  setName: carta.setName,
                  imagen: idioma.imageUrl,
                  cantidad: cartabd.cantidad,
                };
                cartasShow.push(cartaInf);
              }
            });
          });
      });
      this.response = cartasShow;
    });
  }
}
