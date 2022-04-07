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

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
//@Rollback(false) //직접 데이터 보고싶을때
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
        letter.setPassword("1234");
        letter.setMember(member);
        letterService.createLetter(letter, session);

        Letter letter2 = new Letter();
        letter2.setTitle("test2 title");
        letter2.setContent("test2 content");
        letter2.setPassword("1234");
        letter2.setMember(member);
        letterService.createLetter(letter2, session);


        PostListResponse postListResponse = letterService.getLetterList(session);

        Assertions.assertEquals(postListResponse.getEmail(), member.getEmail());
        Assertions.assertEquals(postListResponse.getLetterList().size(), 2);
    }

    @Test
    public void 편지_생성_조회_readable_true () {
        HttpSession session = new MockHttpSession();
        Member member = new Member("woojin8787", "jinu");
        memberRepository.save(member);
        session.setAttribute("userId", member.getId());
        session.setAttribute("accessToken", "testToken");

        Date someday = new Date();
        someday.setDate(someday.getDate()-1);
        Letter letter = new Letter();
        letter.setTitle("test title");
        letter.setContent("test content");
        letter.setPassword("1234");
        letter.setOpenAt(someday);
        letter.setMember(member);
        letterService.createLetter(letter, session);

        Letter resultLetter = letterService.readLetter(letter.getHash());
        Assertions.assertTrue(resultLetter.getReadable());
    }

    @Test
    public void 편지_생성_조회_readable_false () {
        HttpSession session = new MockHttpSession();
        Member member = new Member("woojin8787", "jinu");
        memberRepository.save(member);
        session.setAttribute("userId", member.getId());
        session.setAttribute("accessToken", "testToken");

        Date someday = new Date();
        someday.setDate(someday.getDate()+1);
        Letter letter = new Letter();
        letter.setTitle("test title");
        letter.setContent("test content");
        letter.setPassword("1234");
        letter.setOpenAt(someday);
        letter.setMember(member);
        letterService.createLetter(letter, session);

        Letter resultLetter = letterService.readLetter(letter.getHash());

        Assertions.assertFalse(resultLetter.getReadable());
    }

    @Test
    public void 해시함수_테스트() {
        Assertions.assertEquals(letterService.HASH256("123"), letterService.HASH256("123"));
    }
}