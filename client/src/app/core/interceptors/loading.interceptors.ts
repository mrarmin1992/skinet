import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BudyService } from '../services/budy.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor
{
    constructor(private busyService: BudyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(req).pipe(
            delay(500),
            finalize(() => {
                this.busyService.idle();
            })
        );
    }

}

