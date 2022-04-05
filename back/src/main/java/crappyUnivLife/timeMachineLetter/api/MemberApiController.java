package crappyUnivLife.timeMachineLetter.api;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.service.LetterService;
import crappyUnivLife.timeMachineLetter.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;
    private final LetterService letterService;


    @PostMapping("/user/login")
    public PostListResponse loginRequest(@RequestBody String authorizedCode, HttpSession session) {
        return memberService.kakaoLogin(authorizedCode, session);
    }

    @PostMapping("/user/logout")
    public String logoutRequest(HttpSession session) {
        return memberService.kakaoLogout(session);
        // return email when sccess
    }

    @GetMapping("/letter")
    public PostListResponse postListRequest(HttpSession session) {
        return letterService.getLetterList(session);
    }

    @PostMapping("/letter")
    public Long letterWriteRequest(@RequestBody Letter letter, HttpSession session) {
        return letterService.createLetter(letter, session);
    }
}
