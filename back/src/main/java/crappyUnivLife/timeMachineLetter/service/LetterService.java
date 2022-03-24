package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.repository.LetterRepository;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterService {

    private final MemberRepository memberRepository;
    private final LetterRepository letterRepository;

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
