import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';

import { ModalComponent } from './components/modal/modal.component';
import { ChatService } from './chat.service'
import { ModalService } from './modal.service'
import { ChatBubbleComponent } from './components/chatbubble/chatbubble.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatMessagesHolderComponent } from './components/chat/chat-messages-holder/chat-messages-holder.component';
import { ChatFooterComponent } from './components/chat/chat-footer/chat-footer.component';
import { ChatbubbleTextContentComponent } from './components/chatbubble/chatbubble-text-content/chatbubble-text-content.component';
import { ChatbubbleImageContentComponent } from './components/chatbubble/chatbubble-image-content/chatbubble-image-content.component';
import { FooterButtonTextComponent } from './components/chat/footer-button-text/footer-button-text.component';
import { ChatbubbleLoadingContentComponent } from './components/chatbubble/chatbubble-loading-content/chatbubble-loading-content.component';
import { ChatbubbleOptionContentComponent } from './components/chatbubble/chatbubble-option-content/chatbubble-option-content.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: '**', redirectTo: ''}
]


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ModalComponent,
    ChatBubbleComponent,
    ChatHeaderComponent,
    ChatMessagesHolderComponent,
    ChatFooterComponent,
    ChatbubbleTextContentComponent,
    ChatbubbleImageContentComponent,
    FooterButtonTextComponent,
    ChatbubbleLoadingContentComponent,
    ChatbubbleOptionContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChatService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
