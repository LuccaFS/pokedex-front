import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../../interfaces/chartmodel.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data!: ChartModel[];
  public broadcastedData!: ChartModel[];

  private hubConnection!: signalR.HubConnection;

  constructor(
    private http: HttpClient
  ) { }

  public startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/chart')
    .build();


    this.hubConnection.start()
    .then(() => console.log("Connection started"))
    .catch(err => console.log('Error while starting connection: ' + err));

  }

  public addTransferChartDataListener(){
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      //console.log(data);
    });
  }

  public broadcastChartData(){
    const data = this.data.map(m => {
      const temp = {
        data: m.data,
        label: m.label
      }
      return temp;
    });

    this.hubConnection.invoke('broadcastchartdata', data)
    .catch(err => console.log(err));
  }

  public addBroadcastChartDataListener(){
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.broadcastedData = data;
    });
  }

  public startHttpRequest(){
    this.http.get('https://localhost:5001/api/chart').subscribe(res =>{
      console.log(res);
    })
  }

}
