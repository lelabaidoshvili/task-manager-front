import { Component, OnInit } from '@angular/core';
import {ProjectFacadeService} from "../../facades/project.facade.service";
import {BoardFacadeService} from "../../facades/board-facade.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
projectName: string;
projectAbr: string;
projectColor: string;
boardName: any;



  constructor(private projectFacadeService: ProjectFacadeService,
              private boardFacadeService: BoardFacadeService

  ) { }

  ngOnInit(): void {
    const projects = this.projectFacadeService.getSavedProjects()
    this.projectName = projects[projects.length-1].name
    this.projectAbr = projects[projects.length-1].abbreviation
    this.projectColor = projects[projects.length-1].color
    this.boardFacadeService.getBoards().subscribe((res)=> {
      console.log(res)


  })

  }

}
