import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { I18nService } from './shared/services/i18n/i18n.service';
import { getAnalytics, logEvent } from "firebase/analytics";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  currentLanguage: string = 'en';

  languages: any[] = [
    {
      code: 'en',
      label: 'English',
    },
    {
      code: 'pt',
      label: 'Portuguese',
    },
    {
      code: 'es',
      label: 'Español',
    },
  ];

  selectedLanguage = this.languages[0];

  constructor(
    private translate: TranslateService,
    private apiService: I18nService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
  }

  ngAfterViewInit(): void {
    console.log('Lanzando Evento');
    //Los eventos se muestran luego de haber pasado 24 horas
    //si deseas ver en tiempo real, bajar la plugin de google analytics
    //y activarlo
    const analytics = getAnalytics();
    logEvent(analytics, 'notification_received')
  }

  async setLanguage(): Promise<void> {
    const ipInfo$ = this.apiService.getIPInfo();
    const ipInfo = await lastValueFrom(ipInfo$);

    this.translate.setDefaultLang('en');
    if (ipInfo?.country_code?.toUpperCase() == 'BR') {
      this.translate.setDefaultLang('pt');
      this.currentLanguage = 'pt';
    }
  }

  changeLanguage(event: any): void {
    const { value } = event;
    this.translate.use(value.code);
    this.currentLanguage = value.code;
  }
}
