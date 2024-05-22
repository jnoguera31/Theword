import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/services/record.services';

@Component({
  selector: 'app-recor',
  templateUrl: './recor.page.html',
  styleUrls: ['./recor.page.scss'],
})
export class RecorPage implements OnInit {
  records: any[] = [];
  constructor(private recordService: RecordService) { }

  ngOnInit(): void {
    this.recordService.getTopRecords().subscribe((data: any[]) => {
      this.records = data;
      console.log(this.records)
    });
  }

}
