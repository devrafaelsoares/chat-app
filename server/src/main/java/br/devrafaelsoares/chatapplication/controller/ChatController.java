package br.devrafaelsoares.chatapplication.controller;

import br.devrafaelsoares.chatapplication.chat_message.ChatMessage;
import br.devrafaelsoares.chatapplication.chat_message.ChatRegister;
import br.devrafaelsoares.chatapplication.domain.user.User;
import br.devrafaelsoares.chatapplication.services.ChatMessageService;
import br.devrafaelsoares.chatapplication.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private UserService userService;

    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public void register(
            @Payload ChatRegister chatRegister,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        headerAccessor.getSessionAttributes().put("username", chatRegister.getUsername());
        userService.save(chatRegister);
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        chatMessageService.save(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.disconnect")
    @SendTo("/topic/public")
    public ChatMessage disconnect(
            @Payload ChatMessage chatMessage
    ) {
        userService.disconnect(chatMessage.getSender());
        return chatMessage;
    }

    @GetMapping("/messages/{senderName}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(
            @PathVariable String senderName
    ) {

        User user = userService.findByUsername(senderName);

        return ResponseEntity.ok(chatMessageService.findChatMessages(user.getCreatedAt()));
    }
}
