import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { Tecnico } from "../models/tecnico";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  constructor(private http: HttpClient) {}
  
  findById(id: any, value: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseURL}/tecnicos/${id}`);
  }
  
  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseURL}/tecnicos`);
  }
  
  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseURL}/tecnicos`, tecnico);
  }
  
  update(id: string, tecnico: Tecnico): Observable<void> {
    return this.http.put<void>(`${API_CONFIG.baseURL}/tecnicos/${id}`, tecnico);
  }
  
  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseURL}/tecnicos/${id}`);
  }
}
