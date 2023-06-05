import {LOCALE_ID, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HttpMethod, NG_ENTITY_SERVICE_CONFIG, NgEntityServiceGlobalConfig} from "@datorama/akita-ng-entity-service";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import { en_US as localeZorro, NZ_I18N } from "ng-zorro-antd/i18n";
import { default as localeEn } from "@angular/common/locales/en";
import {registerLocaleData} from "@angular/common";
import { IconDefinition, IconModule } from "@ant-design/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressRouterModule } from "ngx-progressbar/router";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NZ_ICONS } from "ng-zorro-antd/icon";
import {NzAlertModule} from "ng-zorro-antd/alert";

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
];
registerLocaleData(localeEn, 'en');
const icons: IconDefinition[] = [];

const EXPORTED_MODULES = [
  HttpClientModule,
  NzModalModule,
  NzNotificationModule,
  NzAlertModule,
  FormsModule,
  ReactiveFormsModule,
  IconModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
]
@NgModule({
  imports:[
    ...EXPORTED_MODULES,
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#c20acf',
    }),
  ],
  providers: [
    ...LOCALE_PROVIDERS,
    { provide: NZ_ICONS, useValue: icons },
  ],

  exports: [
    ...EXPORTED_MODULES
  ]
})
export class WebCoreModule {

}
