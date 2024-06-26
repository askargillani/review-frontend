import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  public get reqheaders() {
    return this.httpOptions;
  }

  initiateSession(): Observable<any> {
    const reqUrl = 'http://localhost:3000/GetConversationId';
    return this.http.get(reqUrl, this.reqheaders);
  }

  sendPrompt(payload: any): Observable<any> {
    const reqUrl = 'http://localhost:3000/PromptMessage';
    return this.http.post(reqUrl,payload, this.reqheaders);
  }

  selfReview(payload: any): Observable<any> {
    const reqUrl = 'http://localhost:3000/EmployeePrompt';
    return this.http.post(reqUrl,payload, this.reqheaders);
  }

  finalReviewInstruction(payload: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/FinalReviewPrompt';
    return this.http.post(reqUrl,payload, this.reqheaders);
  }

  updateProgrammingSkills(conversationId: any, name: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/updatedProgrammingSkills?conversationId='+conversationId+'&name='+name;
    return this.http.get(reqUrl);
  }

  updateSenseOfResponsibility(conversationId: any, name: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/updatedSenseOfResponsibility?conversationId='+conversationId+'&name='+name;
    return this.http.get(reqUrl);
  }

  updateTeamWork(conversationId: any, name: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/updatedTeamWork?conversationId='+conversationId+'&name='+name;
    return this.http.get(reqUrl);
  }

  updateSelfLearning(conversationId: any, name: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/updatedSelfLearning?conversationId='+conversationId+'&name='+name;
    return this.http.get(reqUrl);
  }

  updateProfessionalAppearance(conversationId: any, name: any): Observable<any>{
    const reqUrl = 'http://localhost:3000/updatedProfessionalAppearance?conversationId='+conversationId+'&name='+name;
    return this.http.get(reqUrl);
  }

  saveReview(payload: any): Observable<any> {
    const reqUrl = 'http://localhost:3000/saveReview'; // Adjust the endpoint URL
    return this.http.post(reqUrl, payload, this.reqheaders);
  }

  compareReview(payload: any): Observable<any> {
    const reqUrl = 'http://localhost:3000/compareReview'; // Adjust the endpoint URL
    return this.http.post(reqUrl, payload, this.reqheaders);
  }
}
