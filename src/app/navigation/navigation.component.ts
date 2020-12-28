import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { NotificationService } from '../core/notification/notification.service';
import { NotificationType, Notification } from '../core/notification/notification.type';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notificationService.notificationSubject
      .subscribe(notification => {
        this.handleNotification(notification);
      });
  }

  private handleNotification(notification: Notification) {
    switch (notification.type) {
      case NotificationType.UNATHORIZED:
        this.router.navigate(['/auth/login']);
        break;
      case NotificationType.FORBIDDEN:
        this.router.navigate(['/home/dashboard']);
        break;
    }
  }

}
