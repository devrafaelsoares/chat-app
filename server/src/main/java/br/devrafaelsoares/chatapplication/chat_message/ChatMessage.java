package br.devrafaelsoares.chatapplication.chat_message;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("chat_messages")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatMessage {

    @Id
    private String id;

    private String sender;

    private String content;

    private MessageType type;

    private Date timestamp;
}
