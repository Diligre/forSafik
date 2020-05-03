import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ProjectService} from '../project.service';
import {Project} from '../common/interfaces/Project';
import {TaskService} from '../task.service';
import {Task} from '../common/interfaces/Task';
import * as _ from 'lodash';

@Component({
  selector: 'app-todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.css']
})
export class TodoPanelComponent implements OnInit {
  projects: Project[];
  tasks: Task[];
  selectedTask: Task;
  selectedProject: Project;

  availableTasks: Task[] = [];
  disabledTasks: Task[] = [];

  constructor(private projectService: ProjectService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe((res: Project[]) => {
      this.projects = res;
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    console.log(this.tasks[event.currentIndex], event.currentIndex);
  }

  getTasksByProject(project: Project): void {
    this.taskService.getTasksByProjectId(project.id).subscribe((res: Task[]) => {
      this.tasks = res;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe((res: void) => {
      const index = this.tasks.findIndex((el: Task) => el.id === task.id);
      this.tasks.splice(index, 1);

      console.log('deleted');
    });
  }


  changeTaskStatus(task: Task) {
    this.taskService.updateTaskStatus(task.id, !task.status).subscribe((res: Task) => {
      const index = this.tasks.findIndex((el: Task) => el.id === task.id);

      if (!res.status) {
        this.tasks.splice(index, 1, res);
      } else {
        this.tasks.splice(index, 1);
        this.tasks.push(res);
      }
    });
  }


  changeTask(task: Task) {
    this.taskService.updateTaskName(task.id, task.name).subscribe((res: Task) => {
      console.log(res);

    });
  }

  editTaskStarted(task: Task) {
    this.selectedTask = task;
  }

  editProjectStarted(project: Project) {
    this.selectedProject = project;
  }


  editTaskFinished(value: string, task: Task, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    console.log(value, task);
    this.selectedTask = null;
    this.changeTask(task);
  }

  editProjectFinished(value: string, projectId: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    console.log(value, projectId);
    this.selectedProject = null;
    this.saveTask(value, projectId);
  }


  saveTask(name: string, projectId: number) {
    this.taskService.saveTask(name, projectId).subscribe((res: Task) => {
      console.log(res);
    });
  }

  saveProject(name: string) {
    this.projectService.saveProject(name).subscribe((res: Project) => {
      console.log(res);
    });
  }

  isSelectedTask = (task) => this.selectedTask === task;

  isSelectedProject = (project) => this.selectedProject === project;

}
