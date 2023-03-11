import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private actionSubject = new Subject()
  action$ = this.actionSubject.asObservable()

  updateAction(action: any) {
    this.actionSubject.next(action)
  }
}
