import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../models/contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({});

  contakList: any[] = [];     // Untuk menyimpan daftar kontak
  waktuSekarang: string = '';

  constructor (
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute, //activated actual data
  ){}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      nama: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.updateWaktu();
    setInterval(() => this.updateWaktu(), 1000);
    
    //Ambil parameter id dari URL
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

      // Konversi id ke number
    const id = idParam ? Number(idParam) : null;  

    if(id !== null && !isNaN(id)){
      this.contactService.getContact(id).subscribe(contact => {
      if(contact)
        this.contactForm.patchValue(contact)
      })
    }
  }

  updateWaktu() {
    const now = new Date();
    this.waktuSekarang = now.toLocaleString(); // Format lokal, misal "23/4/2025, 14:55:01"
  }

  onSubmit() {
    if(this.contactForm.valid){

      const now = new Date();
      const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      const id = idParam ? Number(idParam) : null;

      const dataBaru: any = {
        id: id ?? 0, // mangkih auto diurus service se
        nama: this.contactForm.value.nama,
        phoneNumber: this.contactForm.value.phoneNumber,
        updatedAt: now.toLocaleString() // Format tanggal dan waktu lokal
      };

      this.contakList.push(dataBaru);   // Tambahkan ke daftar kontak
      this.contactForm.reset();         // Reset form
      
      //form submit ketika edit sesuai id
  
      if(id !== null && !isNaN(id)){
        //Edit
        this.contactService.updateContact(id, dataBaru).subscribe(() => {
          alert ('Update a processed')
         this.router.navigate(['/list']);
        })
      }else{
        //Add new
        this.contactService.addContact(dataBaru).subscribe((res) => {
        this.contakList.push(res); 
          alert ('Create a processed')

          this.router.navigate(['/list']);
        })
      }

    }
    else {
      alert ('Data tidak valid');
    }
  }
}
