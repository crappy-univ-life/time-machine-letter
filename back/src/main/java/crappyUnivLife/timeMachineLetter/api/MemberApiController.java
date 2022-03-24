package crappyUnivLife.timeMachineLetter.api;

import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/user/login")
    public PostListResponse kakaoLoginRequest(@RequestBody String authorizedCode, HttpSession session) {
        PostListResponse postListResponse = memberService.kakaoLogin(authorizedCode, session);
        return postListResponse;
    }

    @PostMapping("/user/logout")
    public String saveMemberRequest(HttpSession session) {
        return memberService.kakaoLogout(session);
        // return email when sccess
    }
}
 