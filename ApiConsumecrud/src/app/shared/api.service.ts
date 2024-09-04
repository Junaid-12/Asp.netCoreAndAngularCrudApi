import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }
  GetAllEMployee (){
    return this.http.get<any>("https://localhost:44381/api/User/GetAllUser");
  }
  POstyEmployee(data : any){
    return this.http.post("https://localhost:44381/api/User/CreateUser",data);
  }
   UpdateEMployee(Id : Number , data : any){
  return this.http.put<any>("https://localhost:44381/api/User/UpdateUser/"+Id,data);
   }
   DeleteEMployee(Id : Number ){  
    return this.http.delete<any>("https://localhost:44381/api/User/DeleteUser/"+Id);
     }

}
