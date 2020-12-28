import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition
} from '@angular/material/snack-bar';

import { NotificationService } from '../../core/notification/notification.service';
import {
  NotificationLevel,
  NOTIFICATION_INFO
} from '../../core/notification/notification.type';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notification',
  template: ''
})
export class NotificationComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notificationService.notificationSubject
      .pipe(
        filter(notification => !! NOTIFICATION_INFO[notification.type]),
        map(notification => ({
          message: notification.message,
          ...NOTIFICATION_INFO[notification.type]
        }))
      )
      .subscribe(notificationInfo => {
        const { level, message } = notificationInfo;

        this.snackBar.open(message, 'OK', {
          duration: environment.notification.delay,
          horizontalPosition: environment.notification.horizontalPosition as MatSnackBarHorizontalPosition,
          verticalPosition: environment.notification.verticalPosition as MatSnackBarVerticalPosition,
          panelClass: [ this.getClassForLevel(level) ]
        });
      });
  }

  private getClassForLevel(level: NotificationLevel) {
    switch (level) {
      case NotificationLevel.ERROR:
        return 'error-snackbar';
      case NotificationLevel.WARNING:
        return 'warning-snackbar';
      case NotificationLevel.SUCCESS:
        return 'success-snackbar';
    }
  }
}
