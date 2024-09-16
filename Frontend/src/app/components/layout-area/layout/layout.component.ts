import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    public userFullName: string;
    public role: string;

    constructor() { }

    ngOnInit(): void {
        this.userFullName = localStorage.getItem("full name");
        this.role = localStorage.getItem("role");
    }

}
