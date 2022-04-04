package crappyUnivLife.timeMachineLetter.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
public class Letter {
    @Id @GeneratedValue
    @Column(name = "letter_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String password;

    private Date openAt;

    private String title;

    private String content;

    private Long view_count;

    private Date createAt;

    // 연관관계 편의 매서드 //
    public void setMember(Member member) {
        this.member = member;
        member.getLetter().add(this);
    }
}
