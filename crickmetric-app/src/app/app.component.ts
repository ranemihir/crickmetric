import { Component } from '@angular/core';
import { QueryService } from './query.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    playerInnings: new FormGroup({

    }),
    teamStats: new FormGroup({

    }),
    matches: new FormGroup({

    })
  });

  constructor(
    private queryService: QueryService
  ) { }

}
