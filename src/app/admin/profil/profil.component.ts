import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/profil.js';
    document.body.appendChild(script);
  }
}
