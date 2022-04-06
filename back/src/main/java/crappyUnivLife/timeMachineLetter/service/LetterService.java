package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.repository.LetterRepository;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterService {

    private final MemberRepository memberRepository;
    private final LetterRepository letterRepository;

    public PostListResponse getLetterList(HttpSession session) {

        Member member = memberRepository.findOne((Long) session.getAttribute("userId"));
        List<Letter> letterList = letterRepository.getLetterList(member.getId());
        return new PostListResponse(member.getEmail(), letterList);
    }

    public void createLetter(Letter letter, HttpSession session) {

        String accessToken = (String)session.getAttribute("accessToken");
        Long userId = (Long) session.getAttribute("userId");

        if (accessToken != null) {
            Member member = memberRepository.findOne(userId);
            letter.setMember(member);
            letterRepository.save(letter);
        }
    }

    public Letter readLetter(Long letterId) {
        return letterRepository.findOne(letterId);
    }
}
