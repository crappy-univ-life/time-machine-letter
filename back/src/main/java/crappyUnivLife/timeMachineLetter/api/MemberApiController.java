package crappyUnivLife.timeMachineLetter.api;

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

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;
    private final LetterService letterService;

    @GetMapping("/user/letter")
    public PostListResponse postListRequest(HttpSession session) {
        return letterService.getLetterList(session);
    }

    @PostMapping("/user/login")
    public PostListResponse kakaoLoginRequest(@RequestBody String authorizedCode, HttpSession session) {
        return memberService.kakaoLogin(authorizedCode, session);
    }

    @PostMapping("/user/logout")
    public String saveMemberRequest(HttpSession session) {
        return memberService.kakaoLogout(session);
        // return email when sccess
    }
}
 