import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { ClientService } from '../../core/client/client.service';
import { Client } from '../../core/client/client.type';
import { ProjectService } from '../../core/project/project.service';
import { Project } from '../../core/project/project.type';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements OnInit {

  clients: Observable<Client[]>;
  projects: Observable<Project[]>;
  clientId: number;
  projectId: number;
  from: string;
  to: string;

  loading = new BehaviorSubject(false);

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.clients = this.clientService.search().pipe(
      map(response => response.clients)
    );

    this.loadProjects();
  }

  clientChanged() {
    if (this.clientId !== undefined) {
      this.projectId = undefined;
    }

    this.loadProjects();
  }

  private loadProjects() {
    this.loading.next(true);

    this.projects = this.projectService.search({ client_id: this.clientId }).pipe(
      map(response => response.projects),
      finalize(() => this.loading.next(false))
    );
  }
}
