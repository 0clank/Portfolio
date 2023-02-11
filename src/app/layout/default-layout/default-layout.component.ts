import {Component, OnInit} from '@angular/core';
import {AssetManager} from "../../core/asset/asset-manager";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  ngOnInit(): void {
    console.log("default")
  }



}
