import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-consult-shortcut',
  templateUrl: './consult-shortcut.component.html',
})
export class ConsultShortcutComponent {
  @Input() section!: string
  @Input() shortcuts: { url: string, icon: string, name: string }[] = []
}
