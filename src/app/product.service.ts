import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/productCategories'; 

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateProduct(categoryId: number, productId: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}/products/${productId}`, productData).pipe(
      map((res:any)=>{
        return res;
      })
    );;
  }
  
  deleteProduct(categoryId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}/products/${productId}`);
  }

  addProduct(categoryId: number, productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${categoryId}/products`, productData).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }
}
