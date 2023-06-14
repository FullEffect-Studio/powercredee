import { Component, Input } from '@angular/core';
import {CommonModule,} from "@angular/common";

@Component({
  standalone: true,
  selector: 'bb-empty',
  template: `
    <section
      *ngIf="show"
      class="max-w-lg px-4 py-12 lg:py-20 mx-auto"
    >
      <img class="mx-auto sm:w-2/5" [src]="imageUrl" alt="Branches image"/>

      <h2 *ngIf="searchTerm else emptyListTitle" class="mt-8 text-xl font-medium text-center text-gray-800">
        No match found for {{collectionName}}
      </h2>
      <ng-template #emptyListTitle>
        <h2 class="mt-8 text-xl font-medium text-center text-gray-800">
            {{title}}
        </h2>
      </ng-template>

      <p *ngIf="searchTerm else emptyListDescription" class="mt-4 text-center text-gray-600">
        No {{collectionName}} name contains <span class="font-bold">"{{searchTerm}}"</span>
      </p>
      <ng-template #emptyListDescription>
        <p class="mt-4 text-center text-gray-600">
          <span>{{description}}</span>
        </p>
      </ng-template>
    </section>
  `,
  styles: [],
  imports: [
    CommonModule
  ]
})
export class EmptyComponent {

  @Input() show!: boolean;
  @Input() searchTerm?: string;
  @Input() imageUrl!: string //TODO: provide default empty image url
  @Input() title!: string
  @Input() description!: string;
  @Input() collectionName!: string

}
