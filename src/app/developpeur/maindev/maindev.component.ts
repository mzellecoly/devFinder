import { Component } from '@angular/core';

@Component({
  selector: 'app-maindev',
  templateUrl: './maindev.component.html',
  styleUrls: ['./maindev.component.css']
})
export class MaindevComponent {
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/sidebar.js';
    document.body.appendChild(script);
  }
}
