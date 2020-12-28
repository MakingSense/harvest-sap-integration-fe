import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, NextObserver, TimeoutError, throwError, of, timer } from 'rxjs';
import { timeout, retryWhen, switchMap, map, catchError } from 'rxjs/operators';

import { RequestOptions } from './http.type';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/notification.type';

const REQUEST_TIMEOUT = 6000;
const REQUEST_TIMEOUT_RETRIES = 1;
const REQUEST_RETRY_TIMEOUT = 3000;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  private static isTimeoutError(error: any): error is TimeoutError {
    return error instanceof Error && error.name === 'TimeoutError';
  }

  get<T>(url: string, requestOptions: RequestOptions): Observable<T> {
    const request = this.http.get<T>(url, requestOptions);

    return this.handleRequest<T>(request);
  }

  post<T>(url: string, body: any, requestOptions: RequestOptions): Observable<T> {
    const request = this.http.post<T>(url, body, requestOptions);

    return this.handleRequest<T>(request);
  }

  getQueryParams(params: { [ key: string ]: any } = {}): HttpParams {
    let searchParams = new HttpParams();

    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        searchParams = searchParams.set(key, params[key]);
      }
    });

    return searchParams;
  }

  private handleRequest<T>(request: Observable<T>): Observable<T> {
    let retriesLeft = REQUEST_TIMEOUT_RETRIES;

    return request.pipe(
      // Throws an error after the specified timeout
      timeout(REQUEST_TIMEOUT),
      // Only retry when the error was a timeout and there are retries left
      retryWhen(errors =>
        errors.pipe(
          switchMap(sourceError => {
            if (HttpService.isTimeoutError(sourceError) && retriesLeft > 0) {
              retriesLeft--;
              // Attempt request again after timeout
              return timer(REQUEST_RETRY_TIMEOUT).pipe(
                switchMap(() => of(true))
              );
            } else {
              // Re-throw original error
              return throwError(sourceError);
            }
          })
        )
      ),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(err: HttpErrorResponse | TimeoutError): Observable<never> {
    let error: any;

    if (err instanceof HttpErrorResponse) {
      if (err.error instanceof Error) {
        // These are connection errors, not responses from API
        error = err.error.message;
        this.notifyError(NotificationType.CONNECTION_ERROR);
      } else {
        error = err.error ? err.error.message : 'Error';
        // Check status, and if we detect auth errors act accordingly
        if (err.status === 400) {
          this.notifyError(NotificationType.BAD_REQUEST);
        } else if (err.status === 401) {
          this.notifyError(NotificationType.UNATHORIZED);
        } else if (err.status === 403) {
          this.notifyError(NotificationType.FORBIDDEN);
        } else if (err.status === 404) {
          this.notifyError(NotificationType.NOT_FOUND);
        } else if (err.status === 0) {
          this.notifyError(NotificationType.CONNECTION_ERROR);
        } else if (err.status === 503) {
          this.notifyError(NotificationType.REQUEST_TIMEOUT);
        } else if (err.status >= 500) {
          this.notifyError(NotificationType.SERVER_ERROR);
        }
      }
    } else if (HttpService.isTimeoutError(err)) {
      error = err.message;
      this.notifyError(NotificationType.TIMEOUT_ERROR);
    }

    // Re-throw error as a string
    return throwError(new Error(error));
  }

  private notifyError(type: NotificationType, error?: string) {
    this.notificationService.notify(type, error);
  }
}
