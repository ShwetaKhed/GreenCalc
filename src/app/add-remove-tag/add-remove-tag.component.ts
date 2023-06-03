import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/TokenService';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-remove-tag',
  templateUrl: './add-remove-tag.component.html',
  styleUrls: ['./add-remove-tag.component.css']
})
export class AddRemoveTagComponent implements OnInit{
  result: any;
  token: any;
  selectedValue: any;
  tagForm!: FormGroup;
  tagData!: FormArray;
  controls!: FormArray;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private tokenService: TokenService, private router: Router) { }
  ngOnInit() {
    this.token = this.tokenService.getIdToken();
    if (this.token) {
    this.tagForm = new FormGroup({
      tagData:new FormArray([])
    });
    this.addTag();
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
 }
 ngAfterOnInit() {
  this.controls = this.tagForm.get('tableRows') as FormArray;
}

createTag(): FormGroup {
  return this.formBuilder.group({
    tag: [''],
    count: ['']
  });
}
addTag(): void {
   this.tagData = this.tagForm.get('tagData') as FormArray;
   this.tagData.push(this.createTag());
}
deleteTag(index: number) {
  const control = this.tagForm.get('tagData') as FormArray;
  control.removeAt(index);
}
get getFormControls() {
  const control = this.tagForm.get('tagData') as FormArray;
  return control;
}

changeTags(){
  let tags = this.tagForm.value.tagData;
  let type = "0";
  if (this.selectedValue == 1){
    type = "1";
  } else if (this.selectedValue == 2)
  {
    type = "0";
  }
  const convertedData = {
    "tags": this.tagForm.value.tagData.map((item: { tag: any; count: string; }) => ({
      "tag": item.tag,
      "count": parseInt(item.count)
    }))
  };
  const json =  {
    "url": this.result,
    "type": type,
    "tags": this.tagForm.value.tagData.map((item: { tag: any; count: string; }) => ({
      "tag": item.tag,
      "count": parseInt(item.count)
    }))
}
const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  this.http.post<any>(
    "http://localhost:3000/api/updateTags",
    json, { headers }
  )
  .subscribe(responseData => {
    console.log(responseData);
  });
}
}
