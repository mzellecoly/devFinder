import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js'; // Ajustez le chemin en conséquence
    document.body.appendChild(script);
  }
}
