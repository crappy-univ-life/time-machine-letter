package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.KakaoUserInfo;
import crappyUnivLife.timeMachineLetter.dto.PostListResponse;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import crappyUnivLife.timeMachineLetter.security.kakao.KakaoOAuth2;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@ToString
public class MemberService {

    private final MemberRepository memberRepository;
    private final LetterService letterService;
    private final KakaoOAuth2 kakaoOAuth2;

    public PostListResponse kakaoLogin(String authorizedCode, HttpSession session) {
        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        Member member = kakaoOAuth2.getUserInfoByAccessToken(accessToken);

        //기존에 없던 회원이면 회원가입 - DB에 저장
        if (isNewMember(member)) {
            System.out.println("새로운 맴버 가입 : " + member.getEmail());
            memberRepository.save(member);
        } else {
            System.out.println("기존 맴버 로그인 : " + member.getEmail());
        }

        session.setAttribute("userId", member.getId());
        session.setAttribute("userEmail", member.getEmail());
        session.setAttribute("accessToken", accessToken);


        return letterService.getLetterList(session);
    }

    public void kakaoLogout(HttpSession session) {

        String accessToken = (String)session.getAttribute("accessToken");

        if (accessToken != null) {
            kakaoOAuth2.kakaoLogout(accessToken);
            session.removeAttribute("access_Token");
            session.removeAttribute("userEmail");
        }
    }

    private boolean isNewMember(Member member) {

        List<Member> findMembers = memberRepository.findByEmail(member.getEmail());
        return findMembers.isEmpty();
    }

}
