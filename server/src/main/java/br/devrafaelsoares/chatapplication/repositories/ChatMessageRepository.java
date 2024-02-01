package br.devrafaelsoares.chatapplication.repositories;

import br.devrafaelsoares.chatapplication.chat_message.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {}
