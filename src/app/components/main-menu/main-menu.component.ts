import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [FormsModule, NgbTooltipModule, NgbCollapseModule],
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  @Input()
  searchField: string = "";

  @Output()
  onSearch = new EventEmitter();

  @ViewChild('tooltipHelp') public tooltip: any;
  isMenuCollapsed: boolean = true;

  ngAfterViewInit() {
    this.tooltip.open();
  }

  searchUser(): void {
    if (this.searchField) {
      this.onSearch.emit({text: this.searchField});
    }
  }
}
