import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/sidebar.js';
    document.body.appendChild(script);
  }

}
