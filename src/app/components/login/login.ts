// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  selectedUserId: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((data) => (this.users = data));
  }

  onLogin() {
    const user = this.users.find((u) => u.id == +this.selectedUserId);

    if (user) {
      this.auth.login(user);
      this.router.navigate(['/news']);
    }
  }
}
