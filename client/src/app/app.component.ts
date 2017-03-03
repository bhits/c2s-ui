import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  showDeleteProviderModal = false;

  deleteProvider() {
    this.toggleDeleteProviderModal();
  }

  toggleDeleteProviderModal() {
    this.showDeleteProviderModal = !this.showDeleteProviderModal;
  }

  //TODO to be removed
  close(dialog: any) {
    dialog.close();
  }

}
