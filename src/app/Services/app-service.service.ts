import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, retry, catchError } from 'rxjs/operators'
import { from, Observable, throwError } from 'rxjs'
import { Log } from '../models/Log'
import { Resp } from '../models/Response'
@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {
    console.log('Enotro ss s s ')
  }
  //https://webapito.azurewebsites.net
  getQuery(query: string): Observable<Account> {
    const url = `api/InsLog/${query}`

    const headers = new HttpHeaders()
    // .append('Content-Type', 'application/json')
    // .append('Access-Control-Allow-Headers', 'Content-Type')
    // .append('Access-Control-Allow-Methods', 'GET')
    // .append('Access-Control-Allow-Origin', '*')

    return this.http.get<Account>(url, { headers })
  }

  getListLogs() {
    return this.getQuery(`GetListLogs`)
  }
  enviarSenal(data_log: Log): Observable<any> {
    data_log.DateTransaction = new Date()
    // let json = JSON.stringify({data_log})
    console.log(data_log)
    // let params = 'json=' + json
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PUT, OPTIONS',
    )
    headers.set(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept, Authorization, X-Request-With',
    )
    headers.set('Access-Control-Allow-Credentials', 'true')
    return this.http
      .post<Resp>(
        'http://https://webapito.azurewebsites.net/Api/InsLog/InsertLog',
        JSON.stringify(data_log),
        {
          headers: headers,
        },
      )
      .pipe(retry(1), catchError(this.handleError))
  }

  handleError(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    window.alert(errorMessage)
    return throwError(errorMessage)
  }
}
