import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  constructor(private http: HttpClient) {}
  
  findById(id: any, value: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseURL}/clientes/${id}`);
  }
  
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseURL}/clientes`);
  }
  
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseURL}/clientes`, cliente);
  }
  
  update(id: string, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${API_CONFIG.baseURL}/clientes/${id}`, cliente);
  }
  
  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseURL}/clientes/${id}`);
  }
}
