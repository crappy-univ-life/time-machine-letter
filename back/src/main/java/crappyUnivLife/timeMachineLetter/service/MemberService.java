package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.KakaoUserInfo;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import crappyUnivLife.timeMachineLetter.security.kakao.KakaoOAuth2;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@ToString
public class MemberService {

    private final MemberRepository memberRepository;
    private final KakaoOAuth2 kakaoOAuth2;

    public Member kakaoLogin(String authorizedCode, HttpSession session) {

        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        Member member = kakaoOAuth2.getUserInfoByAccessToken(accessToken);

        //기존에 없던 회원이면 회원가입 - DB에 저장
        if (isNewMember(member)) {
            System.out.println("새로운 맴버 가입 : " + member.getEmail());
            memberRepository.save(member);
        }

        session.setAttribute("userEmail", member.getEmail());
        session.setAttribute("accessToken", accessToken);

        return member;
    }

    public String kakaoLogout(HttpSession session) {

        String accessToken = (String)session.getAttribute("accessToken");
        String email = (String)session.getAttribute("userEmail");

        if (accessToken != null) {
            kakaoOAuth2.kakaoLogout(accessToken);
            session.removeAttribute("access_Token");
            session.removeAttribute("userEmail");
            return email;
        } else {
            return null;
        }
    }

    private boolean isNewMember(Member member) {

        List<Member> findMembers = memberRepository.findByEmail(member.getEmail());
        return findMembers.isEmpty();
    }

}
