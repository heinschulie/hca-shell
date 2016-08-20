import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { PropertyService } from '../services/property.service'; 
import { Property } from '../models/property';

@Injectable()
export class PropertyStateService {

  private _property$: BehaviorSubject<List<Property>> = new BehaviorSubject(List([]));
  public property$: Observable<List<Property>> = this._property$.asObservable();
  
  constructor(private propertyService : PropertyService) {}

  getPropertyListByAddress ( partialAddress : string ): void {
    this.propertyService.getPropertyListByAddress(partialAddress)
        .subscribe(
            res => {
                let allProperties = (<Object[]>res.json()).map((property: any) =>
                    new Property(
                      property._id,
                      property.address,
                      property.featured,
                      property.published,
                      property.bedrooms,
                      property.cost,
                      property.featuredimage,
                      property.floorarea,
                      property.marketstatus,
                      property.webreference
                    ));  

                this._property$.next(List(allProperties));
            },
            err => console.log("Error retrieving exercises")
        );
  }

}
