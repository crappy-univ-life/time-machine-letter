package crappyUnivLife.timeMachineLetter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Letter {
    @Id @GeneratedValue
    @Column(name = "letter_id")
    private Long id;

    private String hash;

    private Boolean readable = true;
    private Boolean isEncrypted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    private String password;

    private Date openAt;

    private String title;

    private String content;

    private String letterFrom;

    private String letterTo;

    private Date createAt = new Date();

    // 연관관계 편의 매서드 //
    public void setMember(Member member) {
        this.member = member;
        member.getLetter().add(this);
    }
}
