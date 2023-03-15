import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

  messages: Message[] = [
    { name: 'Muhammed Ali', text: 'Welcome to the chat.' },
    { name: 'Lebron James', text: 'Thanks bro.' },
  ];

  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto};
    this.messages.push(message);

    return message;
  }

  findAll() {
    return this.messages;
  }
}
