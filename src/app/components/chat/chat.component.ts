import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: []
})
export class ChatComponent implements OnInit {

  // public mensajes: 
  public mensaje: string = '';
  public elemento: any;
  public box: any;

  constructor(public _cs: ChatService) { 

    this._cs.cargarMensajes()
      .subscribe(() => {
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });

  }

  ngOnInit(): void {

    this.elemento = document.getElementById('app-mensaje');
    this.box = document.getElementById('text-box');

  }

  enviar_mensaje() {
    this.box.disabled = true;
    
    if ( this.mensaje.length == 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = "",
        this.box.disabled = false;
      })
      .catch((err) => console.log('Error al enviar el mensaje: ', err));
    
      
  }


}
