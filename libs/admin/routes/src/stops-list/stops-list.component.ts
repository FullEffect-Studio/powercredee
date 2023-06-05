import {Component, OnInit} from '@angular/core';
import {FormBuilder,} from '@angular/forms';
import {BehaviorSubject, map, tap} from 'rxjs';
import {HashMap} from '@datorama/akita';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {StopDto,} from '@bb/shared/dtos';
import {FeMessagesService, StopsQuery, StopsService} from '@bb/web/core';


@Component({
  selector: 'bb-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrls: ['./stops-list.component.scss'],
})
export class StopsListComponent implements OnInit{

  searchTerm = null;
  showPreviewLocationModal = false;
  showAddStopModal = false;
  loading$ = this.placeQuery.selectLoading();
  progressRef: NgProgressRef;
  selectedStop$$ = new BehaviorSubject<StopDto | null>(null);

  filteredStops = new BehaviorSubject<StopDto[]>([])

  busStops$ = this.placeService.filter.selectAllByFilters().pipe(
    map((data) => data as HashMap<StopDto>),
    map((data) => {
      const places: StopDto[] = [];
      for (const placeKey in <any>data) {
        places.push(data[placeKey]);
      }
      return places;
    }),

    tap((data: StopDto[]) => {
      this.filteredStops.next(data)
      if (data.length) {
        this.selectedStop$$.next(data[0]);
      }
    })
  );

  showEditStopModal = false;







  constructor(
    private formBuilder: FormBuilder,
    private placeService: StopsService,
    private placeQuery: StopsQuery,
    private ngProgress: NgProgress,
    private notification: NzNotificationService,
    private feMessages: FeMessagesService,
    private modal: NzModalService
  ) {
    this.progressRef = this.ngProgress.ref();
  }

  ngOnInit(): void {
    this.placeService.get().subscribe();

  }

  onMapReady(map: any) {
    // this.initDrawingManager(map);
  }



  confirmDeletion(data: StopDto) {
    this.modal.confirm({
      nzTitle: 'Delete Bus Stop?',
      nzContent:
        'This action will permanently delete the specified place. Are you sure you want to continue',
      nzAutofocus: 'cancel',
      nzOkDanger: true,
      nzOkText: 'Yes, Delete',
      nzMask: true,
      nzMaskClosable: true,
      nzOnOk: () =>
        this.placeService.delete(data.id).subscribe(
          () => {
            this.placeService.clearCache();
            this.placeService.get().subscribe();
            this.notification.success(
              'Successful!',
              'Bus Stop has been removed'
            );
          },
          (err) => {
            this.notification.error(
              'Ops! something went wrong',
              err.error.errorMessage
            );
          }
        ),
    });
  }




  onSearchTermChange($event: any) {
    const searchTerm: string = $event.target.value || '';
    if(!searchTerm.trim().length){
      this.filteredStops.next(this.placeQuery.getAll())
    }
    else{
      const matches = this.placeQuery.getAll().filter(e => {
        return e.placeGeoName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      })
      this.filteredStops.next(matches)
    }


    // this.placeService.filter.setFilter({
    //   id: 'name',
    //   value: searchTerm,
    //   predicate: (val, index, array) =>
    //     val.placeGeoName
    //       .toLocaleLowerCase()
    //       .includes(searchTerm.toLocaleLowerCase()) ||
    //     val.customName?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    // });
  }
}
