import { Component } from '@angular/core';
import { MainMenuComponent } from '@components/main-menu/main-menu.component'
import { UserService } from '@services/user.service';
import { SearchInterface } from '@interfaces/search.interface';
import { UserCollection } from '@models/user-collection';
import { take } from 'rxjs/operators';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserCardComponent } from '@components/user-card/user-card.component';

@Component({
  standalone: true,
  selector: 'search-user-page',
  imports: [CommonModule, FormsModule, MainMenuComponent, UserCardComponent, NgbPaginationModule, NgbDropdownModule],
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss']
})
export class SearchPage {
  params = <SearchInterface> { text: '', page: 1, perPage: 20, sort: 'followers' };
  userList: UserCollection = new UserCollection([], 0);
  searchField: string = "";
  sortByOptions: any = [];
  submitted: boolean = false;
  errors = [];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getSortByOptions();
  }

  onSearch(text: string = ''): void {
    this.params.text = text;
    this.params.page = 1;
    this.getUsers();
  }

  onChangePage(): void {
    this.getUsers();
  }

  onSort(by: string): void {
    this.getSortBySelected().selected = false;
    this.sortByOptions.find((e: any) => e.value === by).selected = true;
    this.params.sort = by;
    this.params.page = 1;
    this.getUsers();
  }

  getSortBySelected(): any {
    return this.sortByOptions.find((e: any) => e.selected);
  }

  private getUsers() {
    this.errors = [];
    this.userService.getList(this.params).pipe(take(1))
    .subscribe({
      next: (resp) => {
        this.userList = resp;
        this.submitted = true;
      },
      error: (_error) => {
        this.errors = _error.error.errors;
      }
   });
  }

  private getSortByOptions(): void {
    this.sortByOptions = [{
      'display': 'Most followers',
      'value': 'followers',
      'selected': true
    },
    this.sortByOptions = {
      'display': 'Most repositories',
      'value': 'repositories',
      'selected': false
    },
    this.sortByOptions = {
      'display': 'Most recently joined',
      'value': 'joined',
      'selected': false
    }];
  }
}
