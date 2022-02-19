import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MagicServiceService } from '../../services/magic-service.service';

@Component({
  selector: 'app-detailed-mazo',
  templateUrl: './detailed-mazo.component.html',
  styleUrls: ['./detailed-mazo.component.css'],
})

export class DetailedMazoComponent implements OnInit {
  mazoId: any;
  response: any;
  nombreMazo: any;
  page = 1;
  pageSize = 6;
  origen='mazo';
  vacio='';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private magicService: MagicServiceService
  ) {
    this.mazoId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.magicService.getCardsByMazo(this.mazoId).subscribe((data: any) => {
      var cartasBD: any = data;
      var cartasShow: Array<any> = [];
      cartasBD.mazos_cartas.forEach((cartabd: any) => {
        this.magicService
          .getCardById(cartabd.id_carta)
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
                };
                cartasShow.push(cartaInf);
              }
            });
          });
      });
      this.magicService.getMazoById(this.mazoId).subscribe((data: any)=>{
        this.nombreMazo=data.mazo[0].nombre;
      })
      this.response = cartasShow;
    });
  }

  /**
   * Función que borra el mazo
   * @param id
   */
  deleteMazo(id: any){
    this.magicService.deleteMazoById(id).subscribe((data: any)=>{});
    this.router.navigate(['/mazos']);
  }
}
