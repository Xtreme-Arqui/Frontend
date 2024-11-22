import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { Boot } from "../../../agency/models/boot.model";
import { Tourist } from "../../../adventurer/models/tourist.model";
import { BootService } from "../../services/boot.service";
import { TouristService } from "../../../adventurer/services/tourist.service";

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit, AfterViewInit {
  tourists: Tourist[] = [];
  boots: Boot[] = [];
  map: Map | undefined;

  constructor(
    private touristService: TouristService,
    private bootService: BootService
  ) { }

  ngOnInit(): void {
    console.log('Initializing MonitoringComponent');
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  loadData(): void {
    this.touristService.getTourists().subscribe(
      (response) => {
        console.log('Tourists response:', response);
        if (response && response.content) {
          this.tourists = response.content;
          console.log('Tourists loaded:', this.tourists);
        } else {
          console.error('No tourists data received or content is empty.');
        }
        this.bootService.getBoots().subscribe(
          (response) => {
            console.log('Boots response:', response);
            if (response && Array.isArray(response.content)) {
              this.boots = response.content;
              console.log('Boots loaded:', this.boots);
              if (this.map) {
                this.addMarkers(this.map);
              }
            } else {
              console.error('No boots data received or content is not an array.');
            }
          },
          (error) => {
            console.error('Error fetching boots:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching tourists:', error);
      }
    );
  }

  initMap(): void {
    this.map = new Map('map').setView([-12.12719, -77.03575], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  addMarkers(map: Map): void {
    console.log('Adding markers to the map');
    this.boots.forEach(boot => {
      const tourist = boot.tourist;
      if (tourist) {
        console.log(`Adding marker for Tourist: ${tourist.name}, Coordinates: [${boot.latitude}, ${boot.longitude}]`);
        const touristMarker = marker([boot.latitude, boot.longitude]).addTo(map).bindPopup(`${tourist.name} ${tourist.lastName}`);
      } else {
        console.warn(`No tourist found for Boot with ID: ${boot.id}`);
      }
    });

    const validBounds = this.boots
      .filter(boot => boot.latitude && boot.longitude)
      .map(boot => [boot.latitude, boot.longitude] as [number, number]);

    if (validBounds.length > 0) {
      map.fitBounds(validBounds);
    } else {
      console.error('No valid coordinates to fit bounds');
    }
  }

  reloadData(): void {
    console.log('Reloading data...');
    this.loadData();
  }
}
