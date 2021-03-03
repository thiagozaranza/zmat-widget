import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastService } from 'projects/zmat-widgets/src/lib/toast/toast.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zmat-showcase';

  constructor(private toastService: ToastService, private snackBar: MatSnackBar) {
    this.toastService.toaster$.pipe(
      filter(toast => toast.message !== null && toast.message !== undefined && typeof toast.message === 'string')
    ).subscribe(toast => {
      this.snackBar.open(toast.message, toast.action, toast.config);
    });
  }
}
