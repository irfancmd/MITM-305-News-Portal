import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, User } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/news`);
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/news/${id}`);
  }

  createNews(news: Partial<News>): Observable<News> {
    return this.http.post<News>(`${this.apiUrl}/news`, news);
  }

  updateNews(id: number, news: Partial<News>): Observable<News> {
    return this.http.patch<News>(`${this.apiUrl}/news/${id}`, news);
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/news/${id}`);
  }
}
