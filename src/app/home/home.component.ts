import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingPaintings: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingPaintings();
  }

  getTrendingPaintings() {
    this.http
      .get('http://localhost:4200/assets/data/trending-paintings.json')
      .subscribe((paintings) => {
        this.trendingPaintings = paintings;
      });
  }

  goToPainting(type: string, id: string) {
    this.router.navigate(['painting', type, id]);
  }

}