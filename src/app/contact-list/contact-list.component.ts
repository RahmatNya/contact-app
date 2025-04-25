import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = []

  constructor (private contactService: ContactService){

  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe( contacts => {
      this.contacts = contacts
    });
  }

  deleteContact(id: number){
    this.contactService.deleteContact(id).subscribe(() => {
      alert ("Delete request got processed.")});
  }

}
