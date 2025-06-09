import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { AuthService } from "../services/auth.service";
import { ChatService } from "../services/chat.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chats-selector',
  templateUrl: './chats-selector.component.html',
  styleUrls: ['./chats-selector.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    NgForOf
  ]
})
export class ChatsSelectorComponent implements OnInit {
  idMedico: number | null = 0;
  chats: any[] = [];

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.idMedico = this.authService.getPerfilIdFromToken();
    if (this.idMedico) {
      this.chatService.getChatsByMedico(this.idMedico).subscribe({
        next: (data) => {
          this.chats = data;
        },
        error: (err) => {
          console.error('Error al obtener los chats:', err);
        }
      });
    }
  }

  navigateToChat(chatId: number): void {
    this.router.navigate(['/chat', chatId]);
  }
}
