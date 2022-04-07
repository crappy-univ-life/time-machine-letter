package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.repository.LetterRepository;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterService {


    private final MemberRepository memberRepository;
    private final LetterRepository letterRepository;
    private final PasswordEncoder passwordEncoder;

    public PostListResponse getLetterList(HttpSession session) {

        Member member = memberRepository.findOne((Long) session.getAttribute("userId"));
        List<Letter> letterList = letterRepository.getLetterList(member.getId());
        return new PostListResponse(member.getEmail(), letterList);
    }

    public void createLetter(Letter letter, HttpSession session) {

        letter.setPassword(passwordEncoder.encode(letter.getPassword()));

        String accessToken = (String)session.getAttribute("accessToken");
        Long userId = (Long) session.getAttribute("userId");

        if (accessToken != null) {
            Member member = memberRepository.findOne(userId);
            letter.setMember(member);
            letterRepository.save(letter);
            letter.setHash(HASH256(letter.getId().toString()));
        }
    }

    public Letter readLetter(String hash) {
        Letter letter = letterRepository.findByHash(hash);
        letter.setPassword(null);
        validateOpenAt(letter);
        return letter;
    }

    private void validateOpenAt(Letter letter) {
        Date now = new Date();
        if (now.compareTo(letter.getOpenAt()) > 0) {
            letter.setReadable(true);
        } else {
            letter.setReadable(false);
            letter.setTitle(null);
            letter.setContent(null);
        }
    }

    protected String HASH256(String id) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(id.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            //출력
            return hexString.toString();
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
