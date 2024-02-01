import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit{
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/sidebar.js';
    document.body.appendChild(script);
  }
}
