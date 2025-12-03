import { Component } from '@angular/core';
import { ComplaintsView } from "../../components/complaints-view/complaints-view";

@Component({
  selector: 'app-user-complaints-view',
  imports: [ ComplaintsView],
  templateUrl: './user-complaints-view.html',
  styleUrl: './user-complaints-view.css',
})
export class UserComplaintsView {

}
