import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AssetManager} from "../../core/asset/asset-manager";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  ngOnInit(): void {
    console.log("default")
  }
}
