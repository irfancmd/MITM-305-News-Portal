import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-form.html',
  styleUrls: ['./news-form.scss'],
})
export class NewsFormComponent implements OnInit {
  newsData = { title: '', body: '' };
  isEdit = false;
  newsId!: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.newsId = id;
      this.api.getNewsById(this.newsId).subscribe((data) => {
        if (data.author_id !== this.auth.getCurrentUser()?.id) {
          alert('You cannot edit this post.');
          this.router.navigate(['/news']);
        }
        this.newsData = { title: data.title, body: data.body };
      });
    }
  }

  onSubmit() {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) return;

    if (this.isEdit) {
      this.api.updateNews(this.newsId, this.newsData).subscribe(() => {
        this.router.navigate(['/news']);
      });
    } else {
      const newPost = {
        ...this.newsData,
        author_id: currentUser.id,
        comments: [],
      };
      this.api.createNews(newPost).subscribe(() => {
        this.router.navigate(['/news']);
      });
    }
  }
}
