import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker } from './datepicker.component';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [CommonModule,FormsModule,MatIconModule,MatButtonModule],
    declarations: [DatePicker, ClickOutsideDirective],
    exports: [DatePicker,FormsModule, ClickOutsideDirective]
})
export class AngularDateTimePickerModule {

}