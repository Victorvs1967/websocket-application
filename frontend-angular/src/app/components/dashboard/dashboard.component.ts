import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task.model';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  private webSicketService = inject(WebsocketService);

  tasks: Task[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    days: new FormControl<number>(0, Validators.required),
  });

  ngOnInit(): void {
    this.webSicketService.listen(task => this.tasks.push(task));
  }

  add(name: string, days: number): void {
    const task: Task = {
      name: name,
      days: days
    };
    this.webSicketService.send(task);
  }

  click(): void {
    this.add(this.form.value.name, this.form.value.days);
    this.form.reset({});
  }

}
