package br.devrafaelsoares.chatapplication.chat_message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatRegister {

    private String name;

    private String username;
}
