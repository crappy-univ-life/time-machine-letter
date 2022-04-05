package crappyUnivLife.timeMachineLetter.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long Id;

    private String nickname;

    private String email;

    private Date createAt;

    @OneToMany(mappedBy = "member") //order 테이블에 있는 member에 의해 매핑
    private List<Letter> letter = new ArrayList<>();

    protected Member() {
    }

    public Member(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }
}
