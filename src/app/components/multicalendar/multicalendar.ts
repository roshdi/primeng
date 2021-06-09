import {
    NgModule, Component, ElementRef, forwardRef, Renderer2,
    ChangeDetectorRef, NgZone, ChangeDetectionStrategy, ViewEncapsulation, Input
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SharedModule, PrimeNGConfig, MenuItem } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Calendar } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';

import * as moment from 'moment';
import * as jalaliMoment from 'jalali-moment';
import * as jalaMoment from 'jalali-moment';
import { Directionality } from '@angular/cdk/bidi';


export const MultiCALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiCalendar),
    multi: true
};

export interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames?: string[];
    dayNamesShort?: string[];
    dayNamesMin?: string[];
    monthNames?: string[];
    monthNamesShort?: string[];
    today?: string;
    clear?: string;
    dateFormat?: string;
    weekHeader?: string;
}

@Component({
    selector: 'p-multicalendar',
    template: `
        <span #container [ngClass]="{'p-calendar':true, 'p-calendar-rtl':rtl, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled':disabled, 'p-focus': focus}" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [attr.aria-required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick()" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'" autocomplete="off" [attr.aria-labelledby]="ariaLabelledBy">
                    <button type="button" [icon]="icon" pButton pRipple *ngIf="showIcon" (click)="onButtonClick($event,inputfield)"
                    class="p-datepicker-trigger" [disabled]="disabled" tabindex="0"></button>
                    <button type="button" [icon]="calendarSelectIcon" pButton pRipple *ngIf="showCalendarSelectIcon"
                    (click)="calendarSelectionMenu.toggle($event)" class="p-datepickercalendar-trigger" [disabled]="disabled" tabindex="0"></button>
                    <p-menu #calendarSelectionMenu [popup]="true" [model]="calendarSelectIconMenuItems"></p-menu>
            </ng-template>
            <div #contentWrapper [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'p-datepicker p-component': true, 'p-datepicker-inline':inline,
                'p-disabled':disabled,'p-datepicker-timeonly':timeOnly,'p-datepicker-multiple-month': this.numberOfMonths > 1, 'p-datepicker-monthpicker': (view === 'month'), 'p-datepicker-touch-ui': touchUI}"
                [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:
                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" *ngIf="inline || overlayVisible">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index;">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" pRipple>
                                    <span [ngClass]="{'p-datepicker-prev-icon pi':true, 'pi-chevron-left' : !rtl,'pi-chevron-right' : rtl}"></span>
                                </button>
                                <div class="p-datepicker-title">
                                    <span class="p-datepicker-month" *ngIf="!monthNavigator && (view !== 'month')">{{getTranslation('monthNames')[month.month]}}</span>
                                    <select tabindex="0" class="p-datepicker-month" *ngIf="monthNavigator && (view !== 'month') && numberOfMonths === 1" (change)="onMonthDropdownChange($event.target.value)">
                                        <option [value]="i" *ngFor="let monthName of getTranslation('monthNames');let i = index" [selected]="i === month.month">{{monthName}}</option>
                                    </select>
                                    <select tabindex="0" class="p-datepicker-year" *ngIf="yearNavigator && numberOfMonths === 1" (change)="onYearDropdownChange($event.target.value)">
                                        <option [value]="year" *ngFor="let year of yearOptions" [selected]="year === currentYear">{{year}}</option>
                                    </select>
                                    <span class="p-datepicker-year" *ngIf="!yearNavigator">{{view === 'month' ? currentYear : month.year}}</span>
                                </div>
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-next p-link" (click)="onNextButtonClick($event)" *ngIf="numberOfMonths === 1 ? true : (i === numberOfMonths -1)" type="button" pRipple>
                                    <span [ngClass]="{'p-datepicker-next-icon pi':true, 'pi-chevron-right' : !rtl,'pi-chevron-left' : rtl}"></span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="view ==='date'">
                                <table class="p-datepicker-calendar">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{getTranslation('weekHeader')}}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                                                <span>{{weekDay}}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index;">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{month.weekNumbers[j]}}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [ngClass]="{'p-datepicker-other-month': date.otherMonth,'p-datepicker-today':date.today}">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span [ngClass]="{'p-highlight':isSelected(date), 'p-disabled': !date.selectable}"
                                                        (click)="onDateSelect($event,date)" draggable="false" (keydown)="onDateCellKeydown($event,date,i)" pRipple>
                                                        <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                                                        <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                                                    </span>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="view === 'month'">
                        <span *ngFor="let m of monthPickerValues; let i = index" (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event,i)" class="p-monthpicker-month" [ngClass]="{'p-highlight': isMonthSelected(i), 'p-disabled':!isSelectable(1, i, this.currentYear, false)}" pRipple>
                            {{m}}
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="showTime||timeOnly">
                    <div class="p-hour-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{currentHour}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{currentMinute}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{currentSecond}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat=='12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('visibleTouchUI', style({
                transform: 'translate(-50%,-50%)',
                opacity: 1
            })),
            transition('void => visible', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))
            ]),
            transition('visible => void', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ]),
            transition('void => visibleTouchUI', [
                style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition('visibleTouchUI => void', [
                animate(('{{hideTransitionParams}}'),
                    style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    }))
            ])
        ])
    ],
    host: {
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus'
    },
    providers: [MultiCALENDAR_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./multicalendar.css']
})
export class MultiCalendar extends Calendar {

    @Input() showCalendarSelectIcon: boolean = true;

    @Input() calendarSelectIcon: string = 'pi pi-th-large';

    calendarSelectIconMenuItems: MenuItem[] = [];

    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone, config: PrimeNGConfig, dir: Directionality) {
        super(el, renderer, cd, zone, config, dir);
        this.showIcon = true;
        this.monthNavigator = true;
        this.yearNavigator = true;
        this.yearRange = '2000:2030';

        this.calendarSelectIconMenuItems = [{
            label: 'Jalali',
        },
        {
            label: 'Gregorian',
        }];
    }

    _calendarType: CalendarType = CalendarType.Jalali;
    get calendarType(): CalendarType {
        return this._calendarType;
    }
    set calendarType(value: CalendarType) {
        if (this._calendarType === value) {
            return;
        }
        this._calendarType = value;
        this.initializeParams();
    }

    initializeParams() {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                this.firstDayOfWeek = 6;
                break;
            default:
                this.firstDayOfWeek = 0;
                break;
        }
    }

    getMoment(date: Date): moment.Moment {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                const jj: any = jalaliMoment(date).locale('fa');
                return jj;
            default:
                return moment(date);
    }
    }

    set defaultDate(defaultDate: Date) {
        this._defaultDate = defaultDate;
        if (this.initialized) {
            const date = defaultDate || new Date();
            const momentDate = this.getMoment(date);
            this.currentMonth = momentDate.month();
            this.currentYear = momentDate.year();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    ngOnInit() {
        if (this.rtl === undefined) {
            this.rtl = this.dir.value === 'rtl';
        }
        if (this.yearRange === undefined) {
            switch (this.calendarType) {
                case CalendarType.Jalali:
                    this.yearRange = '1310:1410';
                    break;
                default:
                    this.yearRange = '2000:2030';
                    break;
            }
        }
        this.initializeParams();
        const date = this.defaultDate || new Date();
        const momentDate = this.getMoment(date);
        this.currentMonth = momentDate.month();
        this.currentYear = momentDate.year();

        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }
        else if (this.view === 'month') {
            this.createMonthPickerValues();
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
        });

        this.initialized = true;
    }

    updateUI() {
        let val = this.value || this.defaultDate || new Date();
        if (Array.isArray(val)) {
            val = val[0];
        }
        const momentDate = this.getMoment(val);
        this.currentMonth = momentDate.month();
        this.currentYear = momentDate.year();
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }

    createMonth(month: number, year: number) {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                return this.jalaliCreateMonth(month, year);
            default:
                return super.createMonth(month, year);
        }
    }
    isSelectable(day, month, year, otherMonth): boolean {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                return this.jalaliIsSelectable(day, month, year, otherMonth);
            default:
                return super.isSelectable(day, month, year, otherMonth);
        }
    }
    isDateEquals(value, dateMeta): boolean {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                return this.jalaliIsDateEquals(value, dateMeta);
            default:
                return super.isDateEquals(value, dateMeta);
        }
    }
    formatDate(date, format): string {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                return this.jalaliFormatDate(date, format);
            default:
                return super.formatDate(date, format);
        }
    }
    selectDate(dateMeta): void {
        switch (this.calendarType) {
            case CalendarType.Jalali:
                this.jalaliSelectDate(dateMeta);
                break;
            default:
                super.selectDate(dateMeta);
                break;
        }
    }
    getTranslation(option: string) {
        if (this.rtl) {
            switch (this.calendarType) {
                case CalendarType.Jalali:
                    return super.getTranslation(option + '_jalali_fa');
                default:
                    return super.getTranslation(option + '_fa');
            }
        }
        else {
            switch (this.calendarType) {
                case CalendarType.Jalali:
                    return super.getTranslation(option + '_jalali');
                default:
                    return super.getTranslation(option);
            }
        }
    }
    jalaliCreateMonth(month: number, year: number) {
        const currentDate = jalaliMoment.from(`${year}/${month + 1}/01`, 'fa', 'YYYY/M/DD').locale('fa');

        const prevDate = currentDate.clone().subtract(1, 'month');
        const prevMonthYear = prevDate.year();
        const prevMonthMonth = prevDate.month();

        const nextDate = currentDate.clone().add(1, 'month');
        const nextMonthYear = nextDate.year();
        const nextMonthMonth = nextDate.month();

        const today = jalaliMoment(new Date()).locale('fa');
        const todayYear = today.year();
        const todayMonth = today.month();
        const todayDay = today.date();

        const dates = [];
        const firstDay = currentDate.weekday();
        const daysLength = currentDate.daysInMonth();
        const prevMonthDaysLength = prevDate.daysInMonth();
        let dayNo = 1;
        const weekNumbers = [];
        const monthRows = Math.ceil((daysLength + firstDay) / 7);

        for (let i = 0; i < monthRows; i++) {
            const week = [];

            if (i === 0) {
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({
                        day: j,
                        month: prevMonthMonth,
                        year: prevMonthYear,
                        otherMonth: true,
                        today: todayYear === prevMonthYear && todayMonth === prevMonthMonth && todayDay === j,
                        selectable: this.jalaliIsSelectable(j, prevMonthMonth, prevMonthYear, true)
                    });
                }

                const remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({
                        day: dayNo,
                        month,
                        year,
                        today: todayYear === year && todayMonth === month && todayDay === dayNo,
                        selectable: this.jalaliIsSelectable(dayNo, month, year, false)
                    });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength,
                            month: nextMonthMonth,
                            year: nextMonthYear,
                            otherMonth: true,
                            today: todayYear === nextMonthYear && todayMonth === nextMonthMonth && todayDay === (dayNo - daysLength),
                            selectable: this.jalaliIsSelectable((dayNo - daysLength), nextMonthMonth, nextMonthYear, true)
                        });
                    }
                    else {
                        week.push({
                            day: dayNo,
                            month,
                            year,
                            today: todayYear === year && todayMonth === month && todayDay === dayNo,
                            selectable: this.jalaliIsSelectable(dayNo, month, year, false)
                        });
                    }

                    dayNo++;
                }
            }

            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }

            dates.push(week);
        }

        return {
            month,
            year,
            dates,
            weekNumbers
        };
    }

    jalaliIsSelectable(day, month, year, otherMonth): boolean {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;

        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }

        if (this.minDate) {
            const jalaMinDate = this.getMoment(this.minDate);
            if (jalaMinDate.year() > year) {
                validMin = false;
            }
            else if (jalaMinDate.year() === year) {
                if (jalaMinDate.month() > month) {
                    validMin = false;
                }
                else if (jalaMinDate.month() === month) {
                    if (jalaMinDate.date() > day) {
                        validMin = false;
                    }
                }
            }
        }

        if (this.maxDate) {
            const jalaMaxDate = this.getMoment(this.maxDate);
            if (jalaMaxDate.year() < year) {
                validMax = false;
            }
            else if (jalaMaxDate.year() === year) {
                if (jalaMaxDate.month() < month) {
                    validMax = false;
                }
                else if (jalaMaxDate.month() === month) {
                    if (jalaMaxDate.date() < day) {
                        validMax = false;
                    }
                }
            }
        }

        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }

        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year)
        }

        return validMin && validMax && validDate && validDay;
    }
    jalaliIsDateEquals(value, dateMeta): boolean {
        if (value) {
            const jalaliValue = jalaMoment(value).locale('fa');
            return jalaliValue.date() === dateMeta.day && jalaliValue.month() === dateMeta.month && jalaliValue.year() === dateMeta.year;
        }
        return false;
    }
    jalaliFormatDate(date, format): string {
        return jalaliMoment(date).locale('fa').format('YYYY/MM/DD');
    }
    jalaliSelectDate(dateMeta): void {
        let date = jalaMoment.from(`${dateMeta.year}/${dateMeta.month + 1}/${dateMeta.day}`, 'fa', 'YYYY/M/D').toDate();

        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }

            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }

        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }

        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }

        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];

                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }

                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }

        this.onSelect.emit(date);
    }
}

export enum CalendarType {
    Gregorian,
    Jalali,
}
@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, MenuModule],
    exports: [MultiCalendar, ButtonModule, SharedModule, MenuModule],
    declarations: [MultiCalendar]
})
export class MultiCalendarModule { }
