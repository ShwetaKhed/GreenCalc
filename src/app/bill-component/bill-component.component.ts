import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-component',
  templateUrl: './bill-component.component.html',
  styleUrls: ['./bill-component.component.css']
})
export class BillComponentComponent {
elec: Boolean = false;

constructor(private route: ActivatedRoute) {}

ngOnInit() {

  if (this.route.snapshot.paramMap.get('data') == "elec")
  {
    this.elec = true;
  } else
  {
    this.elec = false;
  }
}

}
