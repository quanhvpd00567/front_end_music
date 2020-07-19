import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { History } from 'src/app/models/history';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {

  histories: History[]
  constructor(private fileSercice: FileService) { }

  ngOnInit(): void {
    this.fileSercice.getHistories().subscribe((data: History[]) => {
      this.histories = data
    })
  }

}
