import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.css'],
})
export class PaintingComponent implements OnInit {
  type = '';
  id = '';
  url = '';
  paintings: any;
  painting: any;
  name: any;
  review: any;
  errorMsg: any;

  userForm: FormGroup;
  listData: any;
   
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb:FormBuilder) {
    this.listData = [];
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      review: ['',Validators.required]
    })
  }

  public addReview() : void{
      this.listData.push(this.userForm.value);
      this.userForm.reset();
    
  }

  

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-paintings.json';
    }
    this.getPainting();
  }

  getPainting() {
    this.http.get(this.url).subscribe((paintings) => {
      this.paintings = paintings;
      let index = this.paintings.findIndex(
        (painting: { id: string }) => painting.id == this.id
      );
      if (index > -1) {
        this.painting = this.paintings[index];
      }
    });
  }
}