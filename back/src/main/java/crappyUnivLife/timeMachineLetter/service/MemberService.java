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
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getEmail();

//        로그인 처리 부분
//        Authentication kakaoUsernamePassword = new UsernamePasswordAuthenticationToken(username, password);
//        Authentication authentication = authenticationManager.authenticate(kakaoUsernamePassword);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void validateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByEmail(member.getEmail());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원");
        }
    }


}
