import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtaskProgress',
  standalone: true
})
export class SubtaskProgressPipe implements PipeTransform {
  transform(subtasks: any[] | undefined): { key: string, params: any } | null {
    if (!subtasks || subtasks.length === 0) return null;
    const completed = subtasks.filter(s => s.completed).length;
    return {
      key: 'TASKS.SUBTASK_PROGRESS',
      params: { completed, total: subtasks.length }
    };
  }
}
