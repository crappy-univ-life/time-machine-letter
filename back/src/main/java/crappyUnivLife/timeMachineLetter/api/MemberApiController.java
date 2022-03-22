package crappyUnivLife.timeMachineLetter.api;

import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/user/login")
    public String kakaoLoginRequest(@RequestBody String authorizedCode) {
        System.out.println();
        return memberService.kakaoLogin(authorizedCode); // return email
    }

    @PostMapping("/user/logout")
    public boolean saveMemberRequest() {
        return true;
    }
}
 