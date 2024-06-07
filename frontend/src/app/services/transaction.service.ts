import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  private baseUrl = environment.BASE_URL;  
  private apiUrl = 'v1/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any>(this.baseUrl + this.apiUrl, { params });  
  }
}
