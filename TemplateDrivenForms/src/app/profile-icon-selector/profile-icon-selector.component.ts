import {Component} from '@angular/core';
import {profileIconNames} from "./profile-icon-names";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'con-profile-icon-selector',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './profile-icon-selector.component.html',
    styleUrl: './profile-icon-selector.component.css'
})
export class ProfileIconSelectorComponent {
    profileIcons = profileIconNames
    showAllIcons: boolean = true;
    selectedIcon: string = '';

    iconSelected(icon: string) {
        this.showAllIcons = false;
        this.selectedIcon = icon;
    }
}