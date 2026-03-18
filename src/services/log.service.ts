/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from 'src/utility/enums/log.enum';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public log(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.debug) {
      console.log(...[message, ...optionalParams]);
    }
  }

  public table(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.debug) {
      console.table(...[message, ...optionalParams]);
    }
  }

  public trace(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.debug) {
      console.trace(...[message], ...optionalParams);
    }
  }

  public error(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.error) {
      console.error(...[message, ...optionalParams]);
    }
  }

  public debug(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.debug) {
      console.debug(...[message, ...optionalParams]);
    }
  }

  public info(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.info) {
      console.info(...[message, ...optionalParams]);
    }
  }

  public warn(message?: any, ...optionalParams: any[]) {
    if (environment.logLevel >= LogLevel.warn) {
      console.warn(...[message, ...optionalParams]);
    }
  }
}
