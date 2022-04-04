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
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterService {

    private final MemberRepository memberRepository;
    private final LetterRepository letterRepository;

    public PostListResponse getLetterList(HttpSession session) {

        System.out.println(session.toString());
        System.out.println(session.getId());
        System.out.println(session.getAttributeNames());

        // for test response
        ArrayList<Letter> letterList = new ArrayList<>();
        letterList.add(new Letter());
        letterList.add(new Letter());
        String email;
        email = (String)session.getAttribute("userEmail");
        //

        System.out.println("email: " + email);

        return new PostListResponse(email, letterList);
    }

    public Long writeLetter(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).get(0);

        Letter letter = new Letter();

        letterRepository.save(letter);
        return letter.getId();
    }

    public Letter readLetter(Long letterId) {
        return letterRepository.findOne(letterId);
    }

    public List<Letter> getLetterList(Long memberId)  {
        return letterRepository.getLetterList(memberId);
    }
}
