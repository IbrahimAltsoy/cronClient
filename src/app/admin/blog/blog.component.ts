import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../common/models/BlogPost';
import { BlogService } from '../services/blog.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogs: BlogPost[] = [];
  totalBlogCount: number = 0;
  newBlog: BlogPost = {
    content: '',
    imageUrl: '',
    createdDate: new Date(),
  };
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs(page: number = 0, size: number = 5) {
    this.blogService.read(page, size).subscribe((data) => {
      this.blogs = data.blogs;
      this.totalBlogCount = data.totalBlogCount;
    });
  }

  createBlog() {
    this.blogService.create(
      this.newBlog,
      (result) => {
        // Yeni blog başarıyla oluşturulduğunda gerçekleştirilecek işlemler buraya yazılır
        console.log('Blog başarıyla oluşturuldu', result);
        // Yeni blog oluşturulduktan sonra blogları yeniden yükle
        this.loadBlogs();
        // Yeni blogu temizle
        this.newBlog = {
          content: '',
          imageUrl: '',
          createdDate: new Date(),
        };
      },
      (errorMessage) => {
        // Hata durumunda gerçekleştirilecek işlemler buraya yazılır
        console.error('Blog oluşturulurken bir hata oluştu', errorMessage);
      }
    );
  }
}
