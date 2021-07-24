import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-top-btn',
  templateUrl: './to-top-btn.component.html',
  styleUrls: ['./to-top-btn.component.scss']
})
export class ToTopBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
