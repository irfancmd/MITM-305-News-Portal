import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { News, User } from '../../models';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './news-list.html',
  styleUrls: ['./news-list.scss'],
})
export class NewsListComponent implements OnInit {
  allNews: News[] = [];
  filteredNews: News[] = [];
  users: User[] = [];
  currentUser: User | null = null;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    this.api.getUsers().subscribe((u) => (this.users = u));

    this.loadNews();
  }

  loadNews() {
    this.api.getNews().subscribe((data) => {
      this.allNews = data;
      this.filterNews();
    });
  }

  getAuthorName(id: number): string {
    return this.users.find((u) => u.id === id)?.name || 'Unknown';
  }

  isAuthor(authorId: number): boolean {
    return this.currentUser?.id === authorId;
  }

  deleteNews(id: number) {
    if (confirm('Are you sure?')) {
      this.api.deleteNews(id).subscribe(() => this.loadNews());
    }
  }

  filterNews() {
    let res = this.allNews;
    if (this.searchTerm) {
      res = res.filter((n) =>
        n.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredNews = res.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    this.currentPage++;
    this.filterNews();
  }
  prevPage() {
    this.currentPage--;
    this.filterNews();
  }
}
