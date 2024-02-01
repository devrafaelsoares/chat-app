package br.devrafaelsoares.chatapplication.config;

import br.devrafaelsoares.chatapplication.chat_message.ChatMessage;
import br.devrafaelsoares.chatapplication.chat_message.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.sql.Date;
import java.time.Instant;
import java.time.ZoneId;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    @Autowired
    private SimpMessageSendingOperations messageSendingOperations;
    @EventListener
    public void webSocketDisconnectListener(
            SessionDisconnectEvent event
    ) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        if(username != null) {

            log.info("User disconnected: {}", username);

            ChatMessage chatMessage = ChatMessage
                    .builder()
                    .sender(username)
                    .type(MessageType.LEAVE)
                    .timestamp(Date.from(Instant.now().atZone(ZoneId.systemDefault()).toInstant()))
                    .build();

            messageSendingOperations.convertAndSend("/topic/public", chatMessage);
        }
    }
}
