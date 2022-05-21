package crappyUnivLife.timeMachineLetter.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WebSecurityConfigTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    public void 비밀번호_암호화_테스트() {
        String text = "1234";

        String result = passwordEncoder.encode(text);
        assertAll(
                () -> assertNotEquals(result, text),
                () -> assertTrue(passwordEncoder.matches("1234", result))
        );
    }
}