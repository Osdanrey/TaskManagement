import { Pipe, PipeTransform } from '@angular/core';

export interface DeadlineStatus {
  key: string;
  params?: any;
  colorClass: string;
  urgency: 'overdue' | 'urgent' | 'soon' | 'normal';
}

@Pipe({
  name: 'deadlineAlert',
  standalone: true
})
export class DeadlineAlertPipe implements PipeTransform {
  transform(deadline: string | Date | undefined): DeadlineStatus | null {
    if (!deadline) return null;

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffMs < 0) {
      return {
        key: 'OVERDUE',
        colorClass: 'bg-red-600 text-white',
        urgency: 'overdue'
      };
    }

    if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      const mins = Math.floor((diffHours % 1) * 60);
      return {
        key: 'DUE_IN_HM',
        params: { hours, mins },
        colorClass: 'bg-orange-500 text-white animate-pulse',
        urgency: 'urgent'
      };
    }

    if (diffHours < 72) {
      const days = Math.floor(diffHours / 24);
      return {
        key: 'DUE_IN_DAYS',
        params: { days },
        colorClass: 'bg-yellow-400 text-gray-900',
        urgency: 'soon'
      };
    }

    return {
      key: 'ON_TRACK',
      colorClass: 'bg-green-100 text-green-700',
      urgency: 'normal'
    };
  }
}
