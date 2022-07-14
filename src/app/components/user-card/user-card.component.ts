import { Component, Input } from '@angular/core';
import { User } from '@models/user';

@Component({
  standalone: true,
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input()
  user: User = new User(0, '', '', '', '', 0);
}
