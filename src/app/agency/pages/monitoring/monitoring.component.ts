import {Component, OnInit} from '@angular/core';
import {Map, tileLayer} from "leaflet";
import { TouristService } from '../../../adventurer/services/tourist.service';
import { Tourist } from '../../../adventurer/models/tourist.model';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit{
  tourists: Tourist[] = []

  constructor(private TouristService:TouristService){}

  ngOnInit(): void {
    this.getTourists();
  }

  getTourists(): void {
    this.TouristService.getTourists().subscribe(
      (data) => {
        this.tourists = data;
        console.log(this.tourists);
      }
    )
  }

  ngAfterViewInit():void{
   const map= new Map('map').setView([51.505, -0.09], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }
}
