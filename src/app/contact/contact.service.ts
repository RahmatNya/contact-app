import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = "http://localhost:3002"
    
    private contacts: Contact[] = [];

    constructor(private http: HttpClient){}

  //CRUD
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + "/contacts")
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrl + "/contact/"+id)
  }

  addContact(contact: Contact): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/contact", contact)
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/contact/"+id)
  }
  
  updateContact(id: number, updateContact: Contact): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/contact/" + id, updateContact)
  }
}
