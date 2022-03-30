package crappyUnivLife.timeMachineLetter.security.kakao;

import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.KakaoUserInfo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class KakaoOAuth2 {

    @Value("${login-api.key.kakao}")
    private String client_id;

    public Member getUserInfo(String accessToken) {
        Member userInfo = getUserInfoByAccessToken(accessToken);
        return userInfo;
    }


    public String getAccessToken(String authorizedCode) {
        //HTTP header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP body 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
//        params.add("redirect_uri", "http://localhost:3000/kakao_callback");
        params.add("redirect_uri", "http://timemachineletter.tk/kakao_callback");
        params.add("code", authorizedCode);

        // HTTP Header와 HTTP Body를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //http post 요청 후 응답으로 엑세스토큰 받기
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // json 에서 토큰 파싱
        String tokenJson = response.getBody();
        JSONObject rjson = new JSONObject(tokenJson);

        return rjson.getString("access_token");
    }

    public Member getUserInfoByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        //유저 정보 post 요청.
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        JSONObject body = new JSONObject(response.getBody());

        String email = body.getJSONObject("kakao_account").getString("email");
        String nickname = body.getJSONObject("properties").getString("nickname");

        return new Member(email, nickname);
    }

    public void kakaoLogout(String access_Token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_Token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        //유저 정보 post 요청.
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v1/user/logout",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );
        System.out.println("로그아웃결과");
        System.out.println(response);
        return;
    }
}
