import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from './common/interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = `${environment.BASE_URL}/task`;

  constructor(private http: HttpClient) {
  }

  getTasksByProjectId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}/byProject/${id}`);
  }

  updateTaskStatus(id: number, status: boolean): Observable<Task> {
    return this.http.put<Task>(`${this.URL}/updateStatus`, {
      id,
      status
    });
  }

  updateTaskName(id: number, name: string): Observable<Task> {
    return this.http.put<Task>(`${this.URL}`, {
      id,
      name
    });
  }

}
