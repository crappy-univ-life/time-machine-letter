package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback(false) //직접 데이터 보고싶을때
class LetterServiceTest {
    @Autowired MemberRepository memberRepository;
    @Autowired LetterService letterService;

    @Test
    public void 편지_리스트_가져오기() {
        HttpSession session = new MockHttpSession();
        Member member = new Member("woojin8787", "jinu");
        memberRepository.save(member);
        session.setAttribute("userId", member.getId());
        session.setAttribute("accessToken", "testToken");
        Letter letter = new Letter();
        letter.setTitle("test title");
        letter.setContent("test content");
        letter.setMember(member);
        letterService.createLetter(letter, session);
        Letter letter2 = new Letter();
        letter2.setTitle("test2 title");
        letter2.setContent("test2 content");
        letter2.setMember(member);
        letterService.createLetter(letter2, session);


        PostListResponse postListResponse = letterService.getLetterList(session);

        Assertions.assertEquals(postListResponse.getEmail(), member.getEmail());
        Assertions.assertEquals(postListResponse.getLetterList().size(), 2);
    }
}