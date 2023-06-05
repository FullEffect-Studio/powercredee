import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, RoutesRecognized } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {  Title } from "@angular/platform-browser";
import { BehaviorSubject, filter, map, mergeMap, Subscription, tap } from "rxjs";
import {appMenu} from "../app-menu";

@Component({
  selector: 'bb-workspace',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './workspace.component.html',
  animations: [
    trigger('slideDownUp', [
      state(
        'void',
        style({
          height: 0,
          opacity: 0,
          padding: 0,
          margin: 0,
          // overflow: 'hidden'
        })
      ),
      transition('void <=> *', [animate('250ms ease-in-out')]),
    ]),

    trigger('toggleDiv', [
      state(
        'show',
        style({
          width: '260px',
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          width: '70px',
          opacity: 1,
        })
      ),
      transition('show <=> hide', [animate('0.3s ease-in-out')]),
      transition('hide <=> show', [animate('0.1s ease-in-out')]),
    ]),
  ],
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit{
  usersMenu = {
    isOpen: false,
  };

  strategiesMenu = {
    isOpen: false,
  };

  menus = appMenu

  toggleMenu = true;
  divState = 'show';
  pageTitle$ = new BehaviorSubject<string|null>(null)


  constructor(private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit(): void {

    // this.url$.subscribe(e => console.log('url', e))

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          // this.authService.setInterruptedUrl(this.router.url);
          const currentPath = "/"+route?.snapshot?.routeConfig?.path
          // console.log('route', currentPath)
          const selectedMenu = this.menus
            .filter(e => e.subMenus.length)
            .find(e => {
              const childPaths = e.subMenus.map(s => s.path)
              return childPaths.includes(currentPath);
            })

          // console.log('selected menu', selectedMenu)
          // console.log('selected menu Index', selectedMenuIndex)
          if(selectedMenu) {
            const selectedMenuIndex = this.menus.indexOf(selectedMenu)
            this.menus[selectedMenuIndex].isOpen = true;
          }else {
            this.menus[0].isOpen = true
          }

          return route;
        }),
        filter(route => route.outlet === "primary"),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        // console.log('router event', event)
        this.titleService.setTitle(event["title"] + " | KMMI Admin");
        this.pageTitle$.next(event['title'])
      });


  }




}
