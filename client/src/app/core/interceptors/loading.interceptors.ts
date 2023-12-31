import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {BusyService} from "../services/busy.service";
import {Injectable} from "@angular/core";
import {finalize} from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.includes('orders')) {
      return next.handle(req);
    }
    if ( req.method === 'DELETE' ) {
      return next.handle(req);
    }
    if (!req.url.includes('emailexist')) {
      this.busyService.busy();
    }
   return next.handle(req).pipe(
     // создаеёт задержку по времени во время ответа сервера.
     delay(200),
     finalize(() => {
       this.busyService.idle();
     })
   );
  }

}
