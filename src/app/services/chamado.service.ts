import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  
  
  constructor(private http: HttpClient) { }
  
  findAll():Observable<Chamado[]>{
    return this.http.get<Chamado[]>(`${API_CONFIG.baseURL}/chamados`);
  }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseURL}/chamados/${id}`);
  }

 create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseURL}/chamados`, chamado);
  }
  
  update(id: string, chamado: Chamado): Observable<void> {
    return this.http.put<void>(`${API_CONFIG.baseURL}/chamados/${id}`, chamado);
  }
  
  delete(id: any): Observable<Chamado> {
    return this.http.delete<Chamado>(`${API_CONFIG.baseURL}/chamados/${id}`);
  }
}
