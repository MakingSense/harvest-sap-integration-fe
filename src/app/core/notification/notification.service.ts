import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { NotificationType, Notification } from './notification.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSubject = new Subject<Notification>();

  constructor() { }

  notify(type: NotificationType, message?: any) {
    this.notificationSubject.next({ type, message });
  }
}
