package br.devrafaelsoares.chatapplication.services;


import br.devrafaelsoares.chatapplication.chat_message.ChatMessage;
import br.devrafaelsoares.chatapplication.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void save(ChatMessage chatMessage) {
        chatMessageRepository.save(
                ChatMessage
                        .builder()
                            .sender(chatMessage.getSender())
                            .content(chatMessage.getContent())
                            .type(chatMessage.getType())
                            .timestamp(chatMessage.getTimestamp())
                        .build()
        );
    }

    public List<ChatMessage> findChatMessages(Date createdAtUser) {
        Query query = new Query();
        query.addCriteria(Criteria.where("timestamp").gt(createdAtUser));
        return mongoTemplate.find(query, ChatMessage.class);
    }
}
