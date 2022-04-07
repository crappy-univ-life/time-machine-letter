package crappyUnivLife.timeMachineLetter.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Letter {
    @Id @GeneratedValue
    @Column(name = "letter_id")
    private Long id;

    private String hash;

    private Boolean readable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String password;

    private Date openAt;

    private String title;

    private String content;

    private String letterFrom;

    private String letterTo;

    private Long view_count;

    private Date createAt;

    // 연관관계 편의 매서드 //
    public void setMember(Member member) {
        this.member = member;
        member.getLetter().add(this);
    }
}
