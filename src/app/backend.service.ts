import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url : String = 'http://localhost:5022/'

  constructor(private httpClient: HttpClient) {
  }

  public getEmployes() {
    return this.httpClient.get(`${this.url}employees`)
  }
  public getClients() {
    return this.httpClient.get(`${this.url}clients`)
  }
  public getEmploye( email: String ){
    return this.httpClient.get(`${this.url}employees/email/${email}/`)
  }
  public getEmployeById(id: number) {
    return this.httpClient.get(`${this.url}employees/id/${id}/`)
  }

  public getClient(email: String) {
    return this.httpClient.get(`${this.url}clients/email/${email}/`)
  }

  public getClientById(id: number) {
    return this.httpClient.get(`${this.url}clients/id/${id}/`)
  }

  public deleteEmploye( id : number ){
    return this.httpClient.delete(`${this.url}employees/id/${id}`)
  }

  public postEmploye( user: Object ){
    return this.httpClient.post(`${this.url}employees/new`, user)
  }

  public deleteClient(id: number) {
    return this.httpClient.delete(`${this.url}clients/id/${id}`)
  }

  public postClient(user: Object) {
    return this.httpClient.post(`${this.url}clients/new`, user)
  }

  public getAppointments() {
    return this.httpClient.get<any>(`${this.url}appointments`)
  }

  public getAppointmentsByIdUser(idUser: number) {
    return this.httpClient.get(`${this.url}appointments/client/${idUser}`)
  }

  public getAppointmentsByIdWorker(idWorker: number) {
    return this.httpClient.get(`${this.url}appointments/employee/${idWorker}`)
  }

}
