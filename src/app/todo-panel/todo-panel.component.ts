import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Project, ProjectService} from '../project.service';

@Component({
  selector: 'app-todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.css']
})
export class TodoPanelComponent implements OnInit {
  panelOpenState = false;
  projects: Project[] = [

  ];

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    console.log(this.projects[event.currentIndex], event.currentIndex);

  }

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      this.projects = res;
      console.log(res);
    });
  }

}
