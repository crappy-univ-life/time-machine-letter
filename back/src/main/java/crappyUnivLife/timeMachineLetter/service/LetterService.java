package crappyUnivLife.timeMachineLetter.service;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import crappyUnivLife.timeMachineLetter.dto.LetterListResponse;
import crappyUnivLife.timeMachineLetter.dto.LetterReadResponse;
import crappyUnivLife.timeMachineLetter.dto.ReceivePostListResponse;
import crappyUnivLife.timeMachineLetter.repository.LetterRepository;
import crappyUnivLife.timeMachineLetter.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterService {


    private final MemberRepository memberRepository;
    private final LetterRepository letterRepository;
    private final PasswordEncoder passwordEncoder;

    public LetterListResponse getLetterList(HttpSession session) {

        String accessToken = (String)session.getAttribute("accessToken");
        Long userId = (Long) session.getAttribute("userId");

        if (accessToken != null) {
            Member member = memberRepository.findOne(userId);
            List<Letter> letterList = letterRepository.getLetterList(member.getId());
            return new LetterListResponse(member.getEmail(), letterList);
        } else {
            // 세션 유효하지 않음.
            return new LetterListResponse(null, null);
        }
    }
    public ReceivePostListResponse getReceiveLetterList(HttpSession session) {

        String accessToken = (String)session.getAttribute("accessToken");
        Long userId = (Long) session.getAttribute("userId");

        if (accessToken != null) {
            Member member = memberRepository.findOne(userId);
            List<Letter> letterReceiveList = letterRepository.getReceiveLetterList(member.getEmail());
            return new ReceivePostListResponse(member.getEmail(), letterReceiveList);
        } else {
            // 세션 유효하지 않음.
            return new ReceivePostListResponse(null, null);
        }
    }

    public void createLetter(Letter letter, HttpSession session) {

        if(letter.getPassword() != null && !Objects.equals(letter.getPassword(), "")) {
            letter.setPassword(passwordEncoder.encode(letter.getPassword()));
            letter.setIsEncrypted(true);
        }

        String accessToken = (String)session.getAttribute("accessToken");
        Long userId = (Long) session.getAttribute("userId");

        if (accessToken != null) {
            Member member = memberRepository.findOne(userId);
            letter.setMember(member);
            letterRepository.save(letter);
            letter.setHash(HASH256(letter.getId().toString()));
        }
    }

    public LetterReadResponse readLetter(String hash, String requestPassword, HttpSession session) {
        Optional<Letter> letter = letterRepository.findByHash(hash);
        System.out.println(1);

        if(letter.isPresent()) {
            System.out.println(2);
            LetterReadResponse letterReadResponse = new LetterReadResponse(letter.get());

            if (letter.get().getMember().getId().equals((Long) session.getAttribute("userId"))) {
                System.out.println(3);
                return letterReadResponse;
            }

            validateOpenAt(letterReadResponse);

            // password 가 있을 경우, 패스워드 확인
            if ( requestPassword != null ) {
                System.out.println("requestPassword = " + requestPassword);
                validatePassword(letterReadResponse, requestPassword, letter.get().getPassword());
            } else if (letterReadResponse.getIsEncrypted()) {
                letterReadResponse.setTitle(null);
                letterReadResponse.setContent(null);
            }

            return letterReadResponse;
        } else {
            System.out.println("유효하지 않은 편지" + hash);
            return null;
        }
    }

    public LetterReadResponse readLetter(String hash, String requestPassword) {
        Optional<Letter> letter = letterRepository.findByHash(hash);

        if(letter.isPresent()) {
            LetterReadResponse letterReadResponse = new LetterReadResponse(letter.get());
            validateOpenAt(letterReadResponse);

            // password 가 있을 경우, 패스워드 확인
            if ( requestPassword != null ) {
                System.out.println("requestPassword = " + requestPassword);
                validatePassword(letterReadResponse, requestPassword, letter.get().getPassword());
            } else if (letterReadResponse.getIsEncrypted()) {
                letterReadResponse.setTitle(null);
                letterReadResponse.setContent(null);
            }

            return letterReadResponse;
        } else {
            System.out.println("유효하지 않은 편지" + hash);
            return null;
        }
    }

    private void validatePassword(LetterReadResponse letterReadResponse, String requestPassword, String password) {

        if(passwordEncoder.matches(requestPassword, password)) {
            System.out.println("복호화 성공");
            letterReadResponse.setIsEncrypted(false);
        } else {
            System.out.println("복호화 실패");
            letterReadResponse.setTitle(null);
            letterReadResponse.setContent(null);
        }
    }

    private void validateOpenAt(LetterReadResponse letterReadResponse) {
        Date now = new Date();
        if (now.compareTo(letterReadResponse.getOpenAt()) > 0) {
            letterReadResponse.setReadable(true);
        } else {
            letterReadResponse.setReadable(false);
            letterReadResponse.setTitle(null);
            letterReadResponse.setContent(null);
        }
    }

    protected String HASH256(String id) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(id.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            //출력
            return hexString.toString();
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
