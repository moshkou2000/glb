export class DateModel {
    days = [];
    months = ["January", "Febrary", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
    years = [];

    constructor(minAge: number) { 
        let y = new Date().getFullYear() - 119;
        this.years = Array.from(new Array(120 - minAge), (x,i) => i + y);
    }

    setDays(year: number, month: number): void {
        let d = new Date(year, month, 0).getDate();
        this.days = Array.from(new Array(d), (x, i) => i + 1);
    }
}