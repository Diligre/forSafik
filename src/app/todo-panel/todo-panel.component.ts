import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.css']
})
export class TodoPanelComponent implements OnInit {
  panelOpenState = false;
  movies = [
    {id: 1, name: 'Episode I - The Phantom Menace'},
    {id: 2, name: 'Episode II - The Phantom Menace'},
    {id: 3, name: 'Episode III - The Phantom Menace'},
    {id: 4, name: 'Episode IV - The Phantom Menace'},
    {id: 5, name: 'Episode V - The Phantom Menace'},
    {id: 6, name: 'Episode VI - The Phantom Menace'}
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies[event.currentIndex], event.currentIndex);

  }

  constructor() { }

  ngOnInit() {
  }

}
