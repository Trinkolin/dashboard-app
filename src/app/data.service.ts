import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  storeData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getData(key: string) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
  removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
