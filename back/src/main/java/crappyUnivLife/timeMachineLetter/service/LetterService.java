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
        }
    }

    public Letter readLetter(String hash, HttpSession session) {
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
}
