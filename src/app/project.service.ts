import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Project} from './common/interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL = `${environment.BASE_URL}/project`;

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.URL);
  }

  saveProject(name: string): Observable<Project> {
    return this.http.post<Project>(`${this.URL}`, {
      name,
    });
  }
}
