import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  dashboard(){
    if(sessionStorage.getItem('UserroleId') == '3'){
      this.route.navigate(['home']);
    }

    if(sessionStorage.getItem('UserroleId') == '12'){
      this.route.navigate(['procter-count-views']);
    }
  }

}
