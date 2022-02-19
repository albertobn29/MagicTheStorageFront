import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user_username: any;

  constructor(public login: BackServiceService) { }

  ngOnInit(): void {
    sessionStorage.getItem('user_username')? this.user_username = sessionStorage.getItem('user_username') : this.user_username='USUARIO';
   }

}
