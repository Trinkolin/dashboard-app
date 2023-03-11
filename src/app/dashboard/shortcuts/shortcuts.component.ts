import { Component, Input, OnInit } from '@angular/core';
import { Shortcuts } from './shortcut';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
})
export class ShortcutsComponent implements OnInit {

  @Input() shortcuts: Shortcuts[] = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get<Shortcuts[]>('assets/shortcuts.json').subscribe(shortcut => {
      this.shortcuts = shortcut;
    });
  }
}
