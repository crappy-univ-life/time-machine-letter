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
    public CreateMemberResponse saveMember(@RequestBody Member member) {
        System.out.println(member);
        String email = memberService.join(member);
        return new CreateMemberResponse(email);
    }

    @PostMapping("/user/logout")
    public boolean saveMember() {
        return true;
    }

    @Data
    static class CreateMemberResponse {
        private String email;
        public CreateMemberResponse(String email) {
            this.email = email;
        }
    }

}
