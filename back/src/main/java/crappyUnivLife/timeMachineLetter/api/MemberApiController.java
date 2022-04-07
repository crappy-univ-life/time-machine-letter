package crappyUnivLife.timeMachineLetter.api;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.service.LetterService;
import crappyUnivLife.timeMachineLetter.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public void logoutRequest(HttpSession session) {
        memberService.kakaoLogout(session);
    }

    @GetMapping("/letter")
    public PostListResponse letterListRequest(HttpSession session) {
        return letterService.getLetterList(session);
    }

    @PostMapping("/letter")
    public void letterWriteRequest(@RequestBody Letter letter, HttpSession session) {
        letterService.createLetter(letter, session);
    }

    @GetMapping("/letter/{hash}")
    public Letter postReadRequest(@PathVariable(value="hash") String hash) {
        return letterService.readLetter(hash);
    }
}
