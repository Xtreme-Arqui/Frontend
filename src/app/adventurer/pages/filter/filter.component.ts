import { Component, OnInit} from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{

  filteredRoutes: any[] = [];
  
  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.filteredRoutes$.subscribe(routes => {
      this.filteredRoutes = routes;
      console.log('Filtered routes:', this.filteredRoutes);
    });
  }

}
