import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { News, User } from '../../models';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './news-list.html',
  styleUrls: ['./news-list.scss'],
})
export class NewsListComponent implements OnInit {
  newsItems: News[] = [];
  filteredNews: News[] = [];
  users: User[] = [];
  currentUser: User | null = null;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    this.api.getUsers().subscribe((u) => (this.users = u));

    this.loadNews();
  }

  loadNews() {
    this.api.getNews(this.currentPage, this.itemsPerPage).subscribe((data) => {
      this.newsItems = data.data;
      this.totalPages = data.pages || 1;

      this.filteredNews = this.newsItems;
    });
  }

  getAuthorName(id: number): string {
    return this.users.find((u) => u.id == id)?.name || 'Unknown';
  }

  isAuthor(authorId: number): boolean {
    return this.currentUser?.id == authorId;
  }

  deleteNews(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteNews(id).subscribe(() => this.loadNews());
    }
  }

  filterNews() {
    if(!this.searchTerm) {
      this.currentPage = 1;
      this.itemsPerPage = 1;

      this.loadNews();

      return;
    }

    this.api.getAllNews()
    .subscribe((data) => {
      this.newsItems = data;
    });

    this.filteredNews = this.newsItems.filter((n) =>
      n.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.currentPage = 1;
    this.totalPages = 1;
  }

  nextPage() {
    this.currentPage++;

    this.loadNews();
  }
  prevPage() {
    this.currentPage--;

    this.loadNews();
  }
}
