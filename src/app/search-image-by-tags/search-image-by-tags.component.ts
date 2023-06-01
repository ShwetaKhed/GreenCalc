import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-image-by-tags',
  templateUrl: './search-image-by-tags.component.html',
  styleUrls: ['./search-image-by-tags.component.css']
})

export class SearchImageByTagsComponent {
  result: any
  isHidden: boolean = false;
  imageUrl: string = ''
  isDivVisible: boolean = false;
  isButtonDisabled: boolean = true;
  constructor(private http: HttpClient) { }

  search(): void {

    const searchtagmultiple$ = this.http.get(
      "https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1?tag1=orange&tag2=1");

    searchtagmultiple$.subscribe(res => {
                 this.result = res;
                console.log(this.result[0]);
           });
  }

  constructURL(baseURL: string, params: any): string {
    let url = new URL(baseURL);

    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    url.search = httpParams.toString();
    return url.toString();
  }

  onClickSubmit(data:any) {
    this.result = "";
    if ( data.tag1 == undefined || data.count1 == undefined){
      alert("Please enter")
      return
    }
    console.log(data)
    var length = 0
    const keys = Object.keys(data);
    const tagLength = keys.filter(key => key.startsWith('tag') && data[key] !== '').length;
    const countLength = keys.filter(key => key.startsWith('count') && data[key] !== '').length;

    if (tagLength == countLength){
      length = tagLength
    } else {
      length = tagLength - 1
    }
    console.log(length)
    const baseURL = 'https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1';





    const constructedURL = this.constructURL(baseURL, data);

    this.http.get(constructedURL).subscribe((data) => {
      // Handle response data
    });

   /* if (this.isHidden)
    {
      alert("sdhfbs")
      var url = "https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1?tag1="+ data.tag1 + "&tag2=" +"1"

    }
    else
    {
      var url = "https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1?tag1="+ data.tag1 + "&tag2=" +data.count1
    }
    const searchtag$ = this.http.get("https://zrmhhypvvg.execute-api.us-east-1.amazonaws.com/initial/search1?tag1=elephant&tag2=1");

    searchtag$.subscribe(res => {
                this.result = res;
                console.log(this.result);
                if (this.result != 0)
                {
                  this.isButtonDisabled = false;
                }
                else{
                  alert("No image found try again");
                }
           });*/

 }


 viewImage(){
 /* console.log(this.result[0])
  this.isDivVisible = true;
  this.imageUrl = this.result[0];//"https://imageupload1.s3.amazonaws.com/000000023401.jpg?AWSAccessKeyId=ASIA5JYTWFJ6DKPV26WK&Signature=Kt4Z%2Fv%2Bc%2F67vxqjdUUfc1WvlPNk%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGYaCXVzLWVhc3QtMSJHMEUCIGfMC2PTRd2vqqEfcANIWGgdbbqRIhvTRLAKjuOIdPmPAiEA%2BFAq4Fu7wfnepL7Dc9Osor0cKW6IeZj0Gt7%2BdQQ5%2BVcq7QIInv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTQzMzI0NjE2OTIiDNeUkX1lzRtHvVS%2B8SrBAj0ZwBPH%2BWzVdpf%2B2nGLX2wv9bjjQ9cn78PfUcZHA%2FUUIHzZ%2BROA86g1%2FjUX7uD65ouigsoD8vCgAZ32z3gNHOuAE5VI4SubkVIN%2B%2BszZ%2BbWNlZk6a%2Bb5cIPR3oy6giXCjasCRTVL%2Fo7WENIY9O9RwG8k9j%2F4xdQeA3k6r%2BERir48hqM784DKGAZiC8xDZEPj7wlYw%2Fzxz%2BoXMynGYkDn4UoiHbseIvD2v99AlsvgNtx0YjP3EZcq1sOXsLebUIpQWBzKXOMZnTM0tuV6RvGgRTZLLOLZhv845TpslZteLaGs%2FspVDr0Ft3TwVU3JLoX6u12dcMj6FXyUagRDmfAtWm5zvShVwomkHXfThOYXZGldf5M6Lecrn%2FSkJ0Ce16GiF46Zi6ekEqsddCVIBCaKMS1%2FOYSK%2BssHxiN9pJDiJaNPDDgr9ujBjqeATidSMmohbtEQWqXhaYsjw0DqlSqojWu%2BYCYnLi6%2B%2FNYMmEoESS4Emr7BvwYjzLCWwqF3ZQ9QvyhOjkP9jhlrI7fL7Rt3bVMFbckea%2FV4mxdqV1ZuayTy1N4dx0IzMig7%2BI6V6D6mRiwWq14zhfpwUrE0LGbbcDnaalMHKJgPMm9jeaCNgvF4VzzUAaLb67pITaS354%2BplL4WRvE8hd6&Expires=1685510809"
  */
 this.http.get<any>('http://localhost:3000/api/uploadfile').subscribe(res => {
    console.log(res)
 });

}

addTags(){
 this.isHidden = true
 }

 closeImage(){
  this.isDivVisible = false;
 }
}
