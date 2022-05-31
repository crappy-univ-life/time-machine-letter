package crappyUnivLife.timeMachineLetter.api;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.DecryptionLetterRequest;
import crappyUnivLife.timeMachineLetter.dto.LetterListResponse;
import crappyUnivLife.timeMachineLetter.dto.LetterReadResponse;
import crappyUnivLife.timeMachineLetter.dto.ReceivePostListResponse;
import crappyUnivLife.timeMachineLetter.security.kakao.KakaoOAuth2;
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
    private final KakaoOAuth2 kakaoOAuth2;


    @PostMapping("/user/login")
    public LetterListResponse kakaoCodeLoginRequest(@RequestBody String authorizedCode, HttpSession session) {
        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        return memberService.kakaoLogin(accessToken, session);
    }

    @PostMapping("/user/token-login")
    public LetterListResponse kakaoTokenLoginRequest(@RequestBody String accessToken, HttpSession session) {
        return memberService.kakaoLogin(accessToken, session);
    }

    @PostMapping("/user/logout")
    public void logoutRequest(HttpSession session) {
        memberService.kakaoLogout(session);
    }

    @GetMapping("/letter")
    public LetterListResponse letterListRequest(HttpSession session) {
        return letterService.getLetterList(session);
    }

    @GetMapping("/receiveLetter")
    public ReceivePostListResponse receiveLetterListRequest(HttpSession session) {
        return letterService.getReceiveLetterList(session);
    }

    @PostMapping("/letter")
    public void letterWriteRequest(@RequestBody Letter letter, HttpSession session) {
        letterService.createLetter(letter, session);
    }

    @GetMapping("/letter/{hash}")
    public LetterReadResponse letterReadRequest(@PathVariable(value="hash") String hash) {
        return letterService.readLetter(hash, null);
    }

    @PostMapping("/letter/decryption")
    public LetterReadResponse decryptionLetterRequest(@RequestBody DecryptionLetterRequest decryptionLetterRequest) {
        return letterService.readLetter(decryptionLetterRequest.getHash(), decryptionLetterRequest.getPassword());
    }
}
