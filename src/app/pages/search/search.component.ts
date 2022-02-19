import { Component, OnInit } from '@angular/core';
import { MagicServiceService } from '../../services/magic-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  response: any;
  page = 1;
  pageSize = 6;
  vacio='';
  isLoading:boolean=false;

  constructor(private magicService: MagicServiceService) { }

  ngOnInit(): void {  }

  /**
   * Función para buscar según el valor del campo search
   */
   searchByName(name: string) {
     this.response=null;
     this.isLoading=true;
      this.magicService.getCardsByName(name).subscribe((data) => {
        var cartas = data.cards;
        var cartaInf;
        var cartasShow: Array<any> = [];
        cartas.forEach((carta:any) => {
          carta.foreignNames.forEach((idioma:any) => {
            if(idioma.language == 'Spanish'){
              if(idioma.imageUrl == null){
                idioma.imageUrl = 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=100152&type=card';
              }
              cartaInf = {
                nombre: idioma.name,
                id: carta.multiverseid,
                set: carta.set,
                setName: carta.setName,
                imagen: idioma.imageUrl
              }
              cartasShow.push(cartaInf)
            }
          });
        });
        this.isLoading=false;
        if(cartasShow === []){
          this.vacio = 'No se han encontrado cartas con ese nombre';
        } else {
          this.response = cartasShow;
        }
      });
   }

}
