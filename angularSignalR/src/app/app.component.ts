import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  hubConnection: HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];

  ngOnInit() {
    this.nick = window.prompt('Your name:', 'John');

    // this.hubConnection = new HubConnection('http://localhost:58284/chatHub');
    this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:58284/chat").build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));


    this.hubConnection.on('broadcast', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      alert(text)
    });
  }

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }
}
