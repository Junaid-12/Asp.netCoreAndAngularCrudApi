import { Component, ViewChild } from '@angular/core';
import {FormBuilder ,FormGroup} from'@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employeeobj } from './Employeedasbhod model';
import {MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort, } from '@angular/material/sort';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  formVale ! : FormGroup;
  EmployeeData : any;
  Employeeobj : Employeeobj =  new Employeeobj()
  AddShow ! : boolean;
  UpdateShow !: boolean;
  @ViewChild(MatPaginator) matpaginator !: MatPaginator;
  DataSource : MatTableDataSource<Employeeobj> = new MatTableDataSource();
  @ViewChild(MatPaginator) matPaginator !: MatPaginator;
  @ViewChild(MatSort) matsort !: MatSort;

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Address','Action' ];
  Filtertext: string= '';

  constructor (private formbuilder : FormBuilder , private apiservice: ApiService  ){}
  ngOnInit () : void {

       this.formVale=this.formbuilder.group({
         name:[''],
         email :[''],
         address:['']
       })
     this.GetEmployeeData();

  }

  FilterEmploye(){
  this.DataSource.filter=this.Filtertext;
  }

  clickAdd(){
    this.formVale.reset();
    this.AddShow=true;
    this.UpdateShow=false;
  }
  
  GetEmployeeData(){
    this.apiservice.GetAllEMployee().subscribe((res)=>{
      console.log(res)
      this.EmployeeData= res;
        this.DataSource= new MatTableDataSource<Employeeobj>(this.EmployeeData);
        if(this.matPaginator){
          this.DataSource.paginator= this.matPaginator;
        }
        if(this.matsort){
          this.DataSource.sort= this.matsort;
        }
    
    })
  }

  PostEmployeeData(){
     this.Employeeobj.Name=this.formVale.value.name;
     this.Employeeobj.Email= this.formVale.value.email;
     this.Employeeobj.address= this.formVale.value.address;
     this.apiservice.POstyEmployee(this.Employeeobj).subscribe((res)=>{
      console.log(res);
      alert("Data Save Successfuly");
      this.formVale.reset();
      let ref= document.getElementById("Cancle");
      ref?.click();
      this.GetEmployeeData();
     },error=>{
      alert("something worng ");
     })
  }
  OnEdit(element: any){
    this.AddShow= false;
    this.UpdateShow=true;
    this.Employeeobj.id=element.id;
    this.formVale.controls['name'].setValue(element.name);
    this.formVale.controls['email'].setValue(element.email);
    this.formVale.controls['address'].setValue(element.address);
  }

  UpdateEmployeeData(){
    this.Employeeobj.Name= this.formVale.value.name;
    this.Employeeobj.Email= this.formVale.value.email;
    this.Employeeobj.address= this.formVale.value.address;
    this.apiservice.UpdateEMployee(this.Employeeobj.id,this.Employeeobj).subscribe((res)=>{
      console.log(res);
      alert("Update Successfuly");
      this.formVale.reset();
      let ref= document.getElementById("Cancle");
      ref?.click();
      this.formVale.reset();
      this.GetEmployeeData();
    })
  }

  DeleteEmployeeData(row : any){
    this.Employeeobj.id= row.id
    this.apiservice.DeleteEMployee(this.Employeeobj.id).subscribe((res)=>{
      console.log(res);
      alert("Delete Successfuly");
      this.GetEmployeeData();
    })
  }
}
