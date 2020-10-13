import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import {ShowModel} from '../../models/show.model';
import {ScreenModel} from '../../models/screen.model';
import {DateModel} from '../../models/date.model';

import { environment, keys } from '../../../environments/environment';
/*
  breadcrumbs must follow routes
  just set the direct parent into "parents"
  child must be before parent
  longer url, should go first
  replace any url param with X
*/
const BREADCRUMBS: any = [
    {link: 'home', label: 'Home', parents: null}

];

export const ENVIRONMENTS = [
    {
      id: '',
      name: 'None',
      path: null,
      format: '.hdr'
    },
    {
      id: 'venice-sunset',
      name: 'Venice Sunset',
      path: 'assets/files/environment/venice_sunset_1k.hdr',
      format: '.hdr'
    },
    {
      id: 'footprint-court',
      name: 'Footprint Court (HDR Labs)',
      path: 'assets/files/environment/footprint_court_2k.hdr',
      format: '.hdr'
    }
  ];


// console log options
export const TIME_OPTIONS: any = { hour: "2-digit", minute: "2-digit", second: "2-digit", milisecond: "2-digit", hour12: false };

export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const distinctArray = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
};
  



@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    private isFullscreen: boolean = false;
    private breadcrumb: any = null;
    private screen: ScreenModel = new ScreenModel(false);

    private subjectFullscreen: Subject<Boolean> = new Subject<Boolean>();
    private subjectScreenSize: Subject<any> = new Subject<any>();
    private subjectLayout: Subject<ShowModel> = new Subject<ShowModel>();
    private subjectBackButton: Subject<boolean> = new Subject<boolean>();
    private subjectToggleRightSidenav = new Subject<{ parent: string, child: string, data: any }>();



    constructor() {
        var _subjectFullscreen = this.subjectFullscreen;
        document.addEventListener('fullscreenchange', function () {
            _subjectFullscreen.next(document.fullscreenElement == null)
        });
    }


    getBreadcrumbs(link: string): any {
        if (link.length > 0 && link[0] === "/")
            link = link.substring(1);

        this.breadcrumb = BREADCRUMBS.find((item: any) => this.compareBreadcrumbs(link, item));

        if (this.breadcrumb) {
            if (this.breadcrumb.parents) {
                this.getBreadcrumb(this.breadcrumb.parents[0].link);
            }
        } else
            this.breadcrumb = { link: '', label: '', parents: null };

        return this.breadcrumb;
    }

    getBreadcrumb(link: string): any {
        let breadcrumb = BREADCRUMBS.find(item => this.compareBreadcrumbs(link, item));

        if (breadcrumb.parents) {
            this.breadcrumb.parents.push(this.getBreadcrumb(breadcrumb.parents[0].link));
        }

        return breadcrumb;
    }

    compareBreadcrumbs(link: string, item: any): boolean {
        let linkArray = link.split('/');
        let itemArray = item.link.split('/');
        var flag = linkArray.length === itemArray.length;
        if (flag)
            for (var i = 0; flag && i < itemArray.length; i++)
                if (itemArray[i] != 'X' && itemArray[i] != linkArray[i])
                    flag = false;
        return flag;
    }


    /*
      left sidenav
    */
    toggleLeftSidenav(toOpen: boolean, toClose: boolean): void {
        var d = document.getElementById('left-sidenav-toggle');
        if (d != null) {
            var p = d.parentElement.parentElement.classList.contains('mat-drawer-opened');

            if ((toOpen == null && toClose == null) || (toOpen && !p) || (toClose && p)) {
                d.click();
            }
        } else {
            // !environment.production && console.log('::toggleLeftSidenav is null');
        }
    }

    toggleRightSidenav(): void {
        var d = document.getElementById('right-sidenav-toggle');
        if (d != null) {
            d.click();
        } else {
            // !environment.production && console.log('::toggleRightSidenav is null');
        }
    }

    toggleFullscreen(target_id, isNewRequest): boolean {
        setTimeout(() => {
            this.isFullscreen = false;
        }, 1000);

        if (!this.isFullscreen) {
            this.isFullscreen = true;

            var elem = document.getElementById(target_id);
            if (elem != undefined) {
                if (!document.fullscreenElement || isNewRequest) {
                    elem.requestFullscreen();
                    this.subjectFullscreen.next(true)
                    return true;
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                    this.subjectFullscreen.next(false)
                    return false;
                }
            } else {
                !environment.production && console.log('::toggleFullscreen: ' + target_id + ' is undefind');
            }
        }
    }


    /*
      back button
    */
    setBackButton(): void {
        this.subjectBackButton.next(true);
    }

    getBackButton(): Observable<boolean> {
        return this.subjectBackButton.asObservable();
    }


    /*
      fullscreen
    */
    getFullscreen(): Observable<Boolean> {
        return this.subjectFullscreen.asObservable();
    }

    removeFullscreen(): void {
        this.subjectFullscreen.next();
    }


    /*
      screen size
    */
    setScreenSize(screenSize: ScreenModel): void {
        this.screen = screenSize;
        this.subjectScreenSize.next(screenSize);
    }

    getScreenSize(): Observable<any> {
        return this.subjectScreenSize.asObservable();
    }

    removeScreenSize(): void {
        this.subjectScreenSize.next();
    }

    getMediaSize() {
        return this.screen;
    }


    /*
      humanized
      humanizedCountdown:
      humanizedTime:
      humanizedDate: Feb. 12 2020
      humanizedDateShortString: string datetime to date
    */
    humanizedCountdown(value: number): string {
        const m = Math.floor(value / 60) % 60;
        const s = value % 60;

        let seconds = s < 10 ? '0' + s : s;
        let minutes = m < 10 ? '0' + m : m;

        return `${minutes}:${seconds}`;
    }

    humanizedTime(value: number): string {
        let h = Math.floor((value / 60) / 60);
        let m = Math.floor(value / 60) % 60;
        let s = value % 60;

        let hours = h < 10 ? '0' + h : h;
        let seconds = s < 10 ? '0' + s : s;
        let minutes = m < 10 ? '0' + m : m;

        return `${hours}:${minutes}:${seconds}`;
    }

    humanizedDate(date: Date): any {
        const monthNames = ['Jan.', 'Feb.', 'March', 'Apr.', 'May', 'June', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        return `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    humanizedDateShortString(date: string): string {
        return date && date.length > 0 ? date.split('T')[0] : "";
    }

    print(): void {
        window.print();
    }

}
