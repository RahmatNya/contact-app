import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Contact[] = [];

  constructor(){
    let savedcontacts = localStorage.getItem("contacts");
    this.contacts = savedcontacts? JSON.parse(savedcontacts):[];
  }

  //CRUD
  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: number): Contact | undefined {
    return this.contacts.find(con => con.id === id)
  }

  addContact(contact: Contact): void {

    const storedContacts = JSON.parse(localStorage.getItem("contacts") || '[]');
    // Cari ID terbesar yang sudah ada
    const maxId = storedContacts.length > 0 
      ? Math.max(...storedContacts.map((c: Contact) => c.id)) 
      : 0;
    // Set ID baru secara otomatis
    contact.id = maxId + 1;

    this.contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }

  deleteContact(id: number): void {
    let index = this.contacts.findIndex(con => con.id === id);
    this.contacts.splice(index,1);
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }
  
  updateContact(_id: number, updatedContact: Contact): void {
     let index = this.contacts.findIndex(con => con.id === updatedContact.id);
     this.contacts[index] = updatedContact;
     localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }
}
