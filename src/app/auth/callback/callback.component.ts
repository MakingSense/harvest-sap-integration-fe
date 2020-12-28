import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const paramMap = this.route.snapshot.queryParamMap;

    if (paramMap.has('token')) {
      this.authService.token = paramMap.get('token');
      this.router.navigate([ '/' ]);
    } else if (paramMap.has('error')) {
      console.log('Error during authentication', paramMap.get('error'));
    }
  }

}
