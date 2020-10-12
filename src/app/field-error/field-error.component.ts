import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

 /* Unsubscribe */
 // tslint:disable-next-line: variable-name
 private _unsubscribeAll: Subject<any> = new Subject();
 // tslint:disable-next-line: variable-name
 _control: any;
 labels: any = {};
 @Input() set control(value) {
   if (value) { this._control = value; }
 }

 constructor() { }

 ngOnInit() {
 }

 // tslint:disable-next-line: use-lifecycle-interface
 ngOnDestroy(): void {
   this._unsubscribeAll.next();
   this._unsubscribeAll.complete();
 }
 }

