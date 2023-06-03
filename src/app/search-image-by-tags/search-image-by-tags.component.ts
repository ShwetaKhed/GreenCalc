import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-image-by-tags',
  templateUrl: './search-image-by-tags.component.html',
  styleUrls: ['./search-image-by-tags.component.css']
})

export class SearchImageByTagsComponent implements OnInit{
  result: any
  tagForm!: FormGroup;
  tagData!: FormArray;
  controls!: FormArray;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  ngOnInit() {
    this.tagForm = new FormGroup({
      tagData:new FormArray([])
    });
    this.addTag();
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

searchImage(){
  let tags = this.tagForm.value.tagData;
  if (tags.length == 1)
  {
    const searchtag$ = this.http.get("https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1?tag1=" + this.tagForm.value.tagData[0].tag + "&tag2=" + this.tagForm.value.tagData[0].count);
    searchtag$.subscribe(res => {
                this.result = res;

           });
  }
  else
  {
    const convertedData = {
      "tags": this.tagForm.value.tagData.map((item: { tag: any; count: string; }) => ({
        "tag": item.tag,
        "count": parseInt(item.count)
      }))
    };
    console.log(convertedData);
      this.http.post<any>(
        "http://localhost:3000/api/searchTag",
        convertedData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
}


