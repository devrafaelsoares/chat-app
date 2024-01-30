package br.devrafaelsoares.chatapplication.services;

import br.devrafaelsoares.chatapplication.chat_message.ChatMessage;
import br.devrafaelsoares.chatapplication.chat_message.ChatRegister;
import br.devrafaelsoares.chatapplication.domain.user.Status;
import br.devrafaelsoares.chatapplication.domain.user.User;
import br.devrafaelsoares.chatapplication.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public User findByName(String name) {
        return userRepository.findByName(name).orElseThrow();
    }

    public void save(ChatRegister chatRegister) {
        User user = userRepository.findByName(chatRegister.getName()).orElse(null);

        if(user != null) {
            user.setStatus(Status.ONLINE);
        } else {
            user = User
                    .builder()
                        .id(UUID.randomUUID().toString())
                        .name(chatRegister.getName())
                        .username(chatRegister.getUsername())
                        .status(Status.ONLINE)
                        .createdAt(Timestamp.from(Instant.now().atZone(ZoneId.systemDefault()).toInstant()))
                    .build();
        }
        userRepository.save(user);
    }

    public void disconnect(String sender) {
        User user = findByName(sender);
        user.setStatus(Status.OFFLINE);
        userRepository.save(user);
    }
}
