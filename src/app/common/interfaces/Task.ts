import {Project} from './Project';

export interface Task {
  id: number;
  name: string;
  status: boolean;
  priority: number;
  deadline: number;
  project: Project;
}
