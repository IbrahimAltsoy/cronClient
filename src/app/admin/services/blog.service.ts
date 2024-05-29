import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../common/services/generic-http-service.service';
import { BlogPost } from '../../common/models/BlogPost';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: GenericHttpService) {}

  read(
    page: number = 0,
    size: number = 5
  ): Observable<{ totalBlogCount: number; blogs: BlogPost[] }> {
    return this.httpClient.get<{ totalBlogCount: number; blogs: BlogPost[] }>({
      controller: 'blog',
      querystring: `page=${page}&size=${size}`,
    });
  }

  create(
    blog: BlogPost,
    successCallBack: (result: any) => void = () => {},
    errorCallBack: (errorMessage: string) => void = () => {}
  ) {
    this.httpClient.post<BlogPost>({ controller: 'blog' }, blog).subscribe(
      (result) => {
        successCallBack(result);
      },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';

        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            console.log(_v);
            message += `${_v}<br>`;
          });
        });

        errorCallBack(message);
      }
    );
  }
}
