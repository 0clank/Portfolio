import {Component, OnInit} from '@angular/core';
import {AssetManager} from "../../../core/asset/asset-manager";

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  public loaded: boolean = false;

  ngOnInit(): void {
    console.log("start")
    AssetManager.getInstance().addEventListener('asset:manager:loaded', () => {
      console.log("loaded")
      this.loaded = true;
    })

    AssetManager.getInstance().loadImage("1", "/assets/image-1.jpg")
    AssetManager.getInstance().loadImage("2", "/assets/image-2.jpg")
  }

}
