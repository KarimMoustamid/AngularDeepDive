import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, phoneTypeValues, addressTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import {RestrictedWordsValidator} from "../directives/validators/restricted-words-validator.directive";
import {DateValueAccessorDirective} from "../directives/date-value-accessor/date-value-accessor.directive";
import {ProfileIconSelectorComponent} from "../profile-icon-selector/profile-icon-selector.component";


@Component({
  imports: [CommonModule, FormsModule, RestrictedWordsValidator, ProfileIconSelectorComponent, DateValueAccessorDirective],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contact: Contact = {
    id: '',
    icon: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
    notes: '',
  };

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (contact)
        this.contact = contact;
    });
  }

  saveContact(form: NgForm) {
    console.log(this.contact.dateOfBirth, typeof this.contact.dateOfBirth);
    this.contactsService.saveContact(form.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}