import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../admin/services/blog.service';
import { BlogPost } from '../../../../common/models/BlogPost';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
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
}
