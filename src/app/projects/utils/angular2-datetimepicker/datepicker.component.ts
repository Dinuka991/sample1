import { Component, OnInit, forwardRef, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Settings } from './interface';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePicker),
    multi: true
};

@Component({
    selector: 'angular2-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})

export class DatePicker implements OnInit, ControlValueAccessor {

    @Input()
    settings: Settings;

    @Output()
    onDateSelect: EventEmitter<Date> = new EventEmitter<Date>();

    clearToggle:boolean=false;
  
    @Input() public set clearOnToggle(value: boolean) {
           
           if(value!=this.clearToggle){
               this.clearDynamic();
           }
           this.clearToggle=value;
 
      }

    modelDate: null;
    date: Date;
    popover: Boolean = false;

    cal_days_in_month: Array<any> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    hourValue: number = 0;
    minValue: number = 0;
    secValue: number = 0;
    timeViewMeridian: string = "";
    toTimeViewMeridian: string = "";
    timeView: boolean = false;
    yearView: Boolean = false;
    yearsList: Array<any> = [];
    monthDays: Array<any> = [];
    toMonthDays: Array<any> = [];
    monthsView: boolean = false;
    today: Date = new Date();
    leftDate: Date = new Date();
    rightDate: Date = new Date();

    defaultSettings: Settings = {
        defaultOpen: false,
        timePicker: false,
        format: 'dd-MMM-yyyy hh:mm a',
        cal_days_labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        cal_full_days_lables: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        cal_months_labels: ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'],
        cal_months_labels_short: ['JAN', 'FEB', 'MAR', 'APR',
            'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
            'OCT', 'NOV', 'DEC'],
        closeOnSelect: true
    }
    constructor() {

    }
    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        if (this.settings.defaultOpen) {
            this.popover = true;
        }
    }
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};
    writeValue(value: any) {
        this.date = new Date();
        if (value !== undefined && value !== null) {
            this.modelDate = value;
            this.date = new Date(value);
        }
        this.initTime(this.date);
        this.monthDays = this.generateDays(this.date);
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    initTime(date: Date){
        if (date.getHours() <= 11) {
            this.hourValue = date.getHours();
            this.timeViewMeridian = "AM";
        }
        else {
            this.hourValue = date.getHours() - 12;
            this.timeViewMeridian = "PM";
        }
        if (date.getHours() == 0 || date.getHours() == 12) {
            this.hourValue = 12;
        }
        this.minValue = date.getMinutes();
        this.secValue = date.getSeconds();
    }
    generateDays(date: Date) {
      
        var year = date.getFullYear(),
            month = date.getMonth(),
            current_day = date.getDate(),
            today = new Date();
        var firstDay = new Date(year, month, 1);
        var startingDay = firstDay.getDay();
        var monthLength = this.getMonthLength(month, year);
        var day = 1;
        var dateArr = [];
        var dateRow = [];
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            dateRow = [];
            for (var j = 0; j <= 6; j++) {
                var dateCell = null;
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    dateCell = day;
                    if (day == current_day) {
                        // dateCell.classList.add('selected-day');
                    }
                    if (day == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                        // dateCell.classList.add('today');
                    }
                    day++;
                }
                dateRow.push({ day: dateCell, date: new Date(date.getFullYear() + '-' + (month + 1) + '-' + dateCell) });
            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                dateArr.push(dateRow);
                break;
            } else {
                dateArr.push(dateRow);
            }
        }
        return dateArr;
    }
    generateYearList(param: string) {
       
        var startYear = null;
        var currentYear = null;
        if (param == "next") {
            startYear = this.yearsList[8] + 1;
            currentYear = this.date.getFullYear();
        }
        else if (param == "prev") {
            startYear = this.yearsList[0] - 9;
            currentYear = this.date.getFullYear();
        }
        else {
            currentYear = this.date.getFullYear();
            startYear = currentYear - 4;
            this.yearView = !this.yearView;
            this.monthsView = false;
        }
        for (var k = 0; k < 9; k++) {
            this.yearsList[k] = startYear + k;
        }
    }
    getMonthLength(month: number, year: number) {
        var monthLength = this.cal_days_in_month[month];

        // compensate for leap year
        if (month == 1) { // February only!
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                monthLength = 29;
            }
        }
        return monthLength;
    }
    toggleMonthView() {
     
        this.yearView = false;
        this.monthsView = !this.monthsView;
    }
    toggleMeridian(val?: string) {
      
        if(val){
            this.timeViewMeridian = val;
        }else{
            this.timeViewMeridian = this.timeViewMeridian == 'AM' ? 'PM' : 'AM';
        }

        this.setTimeView(undefined,true);
    }
    setTimeView(toggle?,isMeridian?) {
       
        if (this.timeViewMeridian == "AM") {
            if (this.hourValue == 12) {
                this.date.setHours(0);
            }
            else {
                this.date.setHours(this.hourValue);
            }
        }
        else {
            if (this.hourValue == 12) {
                this.date.setHours(this.hourValue);
            }
            else {
                this.date.setHours(this.hourValue + 12);
            }
        }
        this.date.setMinutes(this.minValue);
        this.date.setSeconds(this.secValue);
        this.date = new Date(this.date);
        if(isMeridian == undefined){
            this.setModelValue(this.date);
        }
       
        if(toggle){
            this.timeView = !this.timeView;
        }
    }

    setDay(evt: any, type?: string) {
       
        if (evt.target.innerHTML) {
            var selectedDay = new Date(evt.target.getAttribute('data-label'));
            // this.date = new Date(selectedDay);
            if(!this.date){
                this.date = new Date();
            }
            this.date = new Date(this.date.setDate(selectedDay.getDate()));
            this.setModelValue(this.date);
            if(this.settings.timePicker){
                this.timeView = true;
            }else if(this.settings.closeOnSelect) {
                this.popover = false;
                this.onDateSelect.emit(this.date);
            } 
        }
    }
    setYear(evt: any) {
       
        var selectedYear = parseInt(evt.target.getAttribute('id'));
        this.date = new Date(this.date.setFullYear(selectedYear));
        this.setModelValue(this.date);
        this.yearView = !this.yearView;
        this.monthDays = this.generateDays(this.date);
    }
    setMonth(evt: any) {
      
        if (evt.target.getAttribute('id')) {
            var selectedMonth = this.settings.cal_months_labels_short.indexOf(evt.target.getAttribute('id'));
            this.date = new Date(this.date.setMonth(selectedMonth));
            this.setModelValue(this.date);
            this.monthsView = !this.monthsView;
            this.monthDays = this.generateDays(this.date);
        }
    }
    prevMonth(e: any) {
       
        e.stopPropagation();
        var self = this;
        if (this.date.getMonth() == 0) {
            this.date.setMonth(11);
            this.date.setFullYear(this.date.getFullYear() - 1);
        } else {
            var prevmonthLength = this.getMonthLength(this.date.getMonth() - 1, this.date.getFullYear());
            var currentDate = this.date.getDate();
            if (currentDate > prevmonthLength) {
                this.date.setDate(prevmonthLength);
            }
            this.date.setMonth(this.date.getMonth() - 1);
        }
        this.date = new Date(this.date);
        this.setModelValue(this.date);
        this.monthDays = this.generateDays(this.date);
    }
    nextMonth(e: any) {
       
        e.stopPropagation();
        var self = this;
        if (this.date.getMonth() == 11) {
            this.date.setMonth(0);
            this.date.setFullYear(this.date.getFullYear() + 1);
        } else {
            var nextmonthLength = this.getMonthLength(this.date.getMonth() + 1, this.date.getFullYear());
            var currentDate = this.date.getDate();
            if (currentDate > nextmonthLength) {
                this.date.setDate(nextmonthLength);
            }
            this.date.setMonth(this.date.getMonth() + 1);

        }
        this.date = new Date(this.date);
        this.setModelValue(this.date);
        this.monthDays = this.generateDays(this.date);
    }
    onChange(evt: any) {
        // console.log(evt);
    }
    incHour() {
        if (this.hourValue < 12) {
            this.hourValue += 1;
            if(this.hourValue == 12){
                this.toggleMeridian();
            }
        }else{
            this.hourValue = 1;
        }
        this.setTimeView();
    }
    decHour() {
        if (this.hourValue > 1) {
            if(this.hourValue == 12){
                this.toggleMeridian();
            }
            this.hourValue -= 1;
        }else{
            this.hourValue = 12;
        }
        this.setTimeView();
    }
    incMinutes() {
        if (this.minValue < 59) {
            this.minValue += 1;
        }else{
            this.minValue = 0;
            this.incHour();
        }
        this.setTimeView();
    }
    decMinutes() {
        if (this.minValue > 0) {
            this.minValue -= 1;
        }else{
            this.minValue = 59;
            this.decHour();
        }
        this.setTimeView();
    }
    incSeconds() {
        if (this.secValue < 59) {
            this.secValue += 1;
        }else{
            this.secValue = 0;
            this.incMinutes();
        }
        this.setTimeView();
    }
    decSeconds() {
        if (this.secValue > 0) {
            this.secValue -= 1;
        }else{
            this.secValue = 59;
            this.decMinutes();
        }
        this.setTimeView();
    }
    done() {
       
        if(this.timeView){
            this.setTimeView(true);
        }
        this.setModelValue(this.date);
        this.popover = false;
        this.onDateSelect.emit(this.date);
    }
    close() {
        this.closepopover();
    }
    togglePopover() {
       
        if (this.popover) {
            this.closepopover();
        }
        else {
            this.popover = true;
        }
    }
    closepopover() {
        this.popover = false;
    }
    composeDate(date: Date) {
      
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    getCurrentWeek() {
        var curr_date = new Date();

        var day = curr_date.getDay();

        var diff = curr_date.getDate() - day + (day == 0 ? -6 : 1); // 0 for sunday

        var week_start_tstmp = curr_date.setDate(diff);

        var week_start = new Date(week_start_tstmp);


        var week_end = new Date(week_start_tstmp);  // first day of week 

        week_end = new Date(week_end.setDate(week_end.getDate() + 6));


        var date = week_start + ' to ' + week_end;    // date range for current week
        if (week_start.getMonth() === week_end.getMonth()) {
            this.monthDays = this.generateDays(week_start);
            var tempDate = new Date(week_end);
            tempDate.setMonth(tempDate.getMonth() + 1);
            tempDate.setDate(1);
            this.toMonthDays = this.generateDays(tempDate);
        }
        else {
            this.monthDays = this.generateDays(week_start);
            this.toMonthDays = this.generateDays(week_end);
        }

    }
    setNow(){
       
        let nowDateAndTime = new Date();
        if(this.timeView){
            this.initTime(nowDateAndTime);
            this.setTimeView();
        }else{
            this.date.setDate(nowDateAndTime.getDate());
            this.date.setMonth(nowDateAndTime.getMonth());
            this.date.setFullYear(nowDateAndTime.getFullYear());
            this.date = new Date(this.date);
        }
        if(!this.settings.timePicker){
            this.closepopover();
        }
        this.setModelValue(this.date);
    }
    clear(){
      
        this.date = new Date();
        this.closepopover();
        this.setModelValue(null);
    }
    clearDynamic(){
       
        this.modelDate = null;

    }
    setModelValue(value){
       
        this.modelDate = value;
        this.onChangeCallback(value);
    }
}