package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.KakaoUserInfo;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import crappyUnivLife.timeMachineLetter.security.kakao.KakaoOAuth2;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final KakaoOAuth2 kakaoOAuth2;

    public String kakaoLogin(String authorizedCode) {
        Member member = kakaoOAuth2.getUserInfo(authorizedCode);
        if(isDuplicateMember(member)) {
            System.out.println("기존 회원 : " + member.getEmail());
            return "기존 회원 : " + member.getEmail();
        } else {
            memberRepository.save(member);
            System.out.println("새로운 회원 : " + member.getEmail());
            return "새로운 회원 : " + member.getEmail();
        }

//        로그인 처리 부분
//        Authentication kakaoUsernamePassword = new UsernamePasswordAuthenticationToken(username, password);
//        Authentication authentication = authenticationManager.authenticate(kakaoUsernamePassword);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private boolean isDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByEmail(member.getEmail());
        if (!findMembers.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }


}
