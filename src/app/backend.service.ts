import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url : String = 'http://localhost:5000/api/'

  constructor(private httpClient: HttpClient) {
  }

  public putWash(product: any) {
    return this.httpClient.put(`${this.url}lavados`, product)
  }
  public putStore(product: any) {
    return this.httpClient.put(`${this.url}sucursales`, product)
  }
  public putProvider(product: any) {
    return this.httpClient.put(`${this.url}proveedores`, product)
  }
  public putProduct(product: any){
    return this.httpClient.put(`${this.url}productos`, product)
  }
  public deleteProduct(nombre: any) {
    return this.httpClient.delete(`${this.url}productos/${nombre}`)
  }
  public deleteProvider(id: any) {
    return this.httpClient.delete(`${this.url}proveedores/${id}`)
  }
  public deleteWash(id: any) {
    return this.httpClient.delete(`${this.url}lavados/${id}`)
  }
  public deleteStore(id:any){
    return this.httpClient.delete(`${this.url}sucursales/${id}`)
  }
  public putClient(user: any) {
    return this.httpClient.put(`${this.url}clientes`, user)
  }
  public postAppoiment(appoinment:any){
    return this.httpClient.post(`${this.url}citas`, appoinment)
  }
  public putEmploye(user: any){
    return this.httpClient.put(`${this.url}trabajadores`, user)
  }
  public getEmployebyEmail(email: string) {
    return this.httpClient.get(`${this.url}trabajadores/email/${email}`)
  }
  public getWash() {
    return this.httpClient.get(`${this.url}lavados`)
  }
  public getProviders() {
    return this.httpClient.get(`${this.url}proveedores`)
  }
  public getProducts() {
    return this.httpClient.get(`${this.url}productos`)
  }
  public getAppointments() {
    return this.httpClient.get(`${this.url}citas`)
  }
  public getServices() {
    return this.httpClient.get(`${this.url}lavados`)
  }
  public getStores() {
    return this.httpClient.get(`${this.url}sucursales`)
  }
  public getEmployes() {
    return this.httpClient.get(`${this.url}trabajadores`)
  }
  public getClients() {
    return this.httpClient.get(`${this.url}clientes`)
  }
  public getEmployeById(id: number) {
    return this.httpClient.get(`${this.url}trabajadores/id/${id}/`)
  }

  public getClient(email: String) {
    return this.httpClient.get(`${this.url}clientes/email/${email}/`)
  }

  public getClientById(id: number) {
    return this.httpClient.get(`${this.url}clientes/id/${id}/`)
  }

  public deleteEmploye( id : number ){
    return this.httpClient.delete(`${this.url}trabajadores/${id}`)
  }

  public postEmploye( user: Object ){
    return this.httpClient.post(`${this.url}trabajadores/new`, user)
  }

  public deleteClient(id: number) {
    return this.httpClient.delete(`${this.url}clientes/${id}`)
  }

  public postClient(user: Object) {
    return this.httpClient.post(`${this.url}clientes/new`, user)
  }
  public getAppointmentsByIdUser(idUser: number) {
    return this.httpClient.get(`${this.url}appointments/client/${idUser}`)
  }

  public getAppointmentsByIdWorker(idWorker: number) {
    return this.httpClient.get(`${this.url}appointments/employee/${idWorker}`)
  }

}
