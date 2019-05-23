import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FeatureService} from '../../feature.service';
import {tap, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public MS_PER_HOUR = 3600000;
  public MS_PER_MINUTE = 60000;
  public MS_PER_SECOND = 1000;

  public uniqueFeature: any[] = [];

  public updater$ = new BehaviorSubject([]);
  public storedData = [];
  public view: Observable<any[]>;

  public baseUnit = 'minutes';
  public baseUnitStep = '1';
  public aggregate = 'max';

  public min = new Date();
  public max = new Date();

  public aggregateIndex = {};

  constructor(private featureService: FeatureService ) {}

  ngOnInit() {
    this.featureService.getUnique().pipe(
      tap((data: any[]) => {
        console.log(data);
        this.uniqueFeature = [...data];
      })
    ).subscribe();

    this.featureService.getFeatures().pipe(
      // Format the dates
      map( (data: any[]): any[] => {
        console.log('NEW RECORD==> ', data);
        return data.map((item) => {
          item.Date = new Date(item.Date);
          return item;
        });
      }),
      // Combine old and new data.
      map( (data: any[]) => {
        return [...this.storedData, ...data];
      }),
      // Store the total in storage.
      tap( (data: any[]) => {
        this.storedData = data;
        console.log('ALL==> ', data);
      }),
      // filter by date.
      tap( (data: any[]) => {
        // this.min = this.chartValues[this.chartValues.length - 20].time;
        this.max = data[data.length - 1].Date;
      })
    ).subscribe((data) => {
      this.updater$.next(data);
    });

    this.view = this.updater$.pipe();

  }

  public findLessAggregate(category) {

    let dTime = new Date(category).valueOf();
    switch (this.baseUnit) {
      case 'seconds':
        dTime = dTime - (this.MS_PER_SECOND * parseInt(this.baseUnitStep,10 ) );
        break;
      case 'minutes':
        dTime = dTime - (this.MS_PER_MINUTE * parseInt(this.baseUnitStep,10 ) );
        break;
      case 'hours':
        dTime = dTime - (this.MS_PER_HOUR * parseInt(this.baseUnitStep,10 ) );
        break;
      default:
      // code block
    }

    return this.aggregateIndex[(new Date(dTime)).toString()];
  }

  public myAggregate(values: number[], series: any, dataItems: any[], category: string) {
    /* Return a sum of the values */
    const sum = values.reduce((total, currentValue = 0) => {
      return total + currentValue
    } , 0);
/*    if (sum === 0) {
      console.log('not found ==?' + category);
      this.aggregateIndex[category] = this.findLessAggregate(category);
    } else {
      this.aggregateIndex[category] = sum / values.length;
    }*/
    return sum / values.length;
  }


}
