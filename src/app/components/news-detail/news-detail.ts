import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { News, User, Comment } from '../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.scss'],
})
export class NewsDetailComponent implements OnInit {
  news!: News;
  authorName = '';
  users: User[] = [];
  newCommentText = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((u) => (this.users = u));

    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadNews(id);
  }

  loadNews(id: string) {
    this.api.getNewsById(id).subscribe((data) => {
      this.news = data;
      this.authorName = this.getUserName(data.author_id);
    });
  }

  getUserName(id: number): string {
    return this.users.find((u) => u.id == id)?.name || 'Unknown';
  }

  addComment() {
    const user = this.auth.getCurrentUser();
    if (!user || !this.news) return;

    const newComment: Comment = {
      id: Date.now(),
      text: this.newCommentText,
      user_id: user.id,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...this.news.comments, newComment];

    this.api
      .updateNews(this.news.id, { comments: updatedComments })
      .subscribe(() => {
        this.newCommentText = '';
        this.loadNews(this.news.id);
      });
  }
}
