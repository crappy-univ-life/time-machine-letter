package crappyUnivLife.timeMachineLetter.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
public class Member {
    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long Id;

    private String userName;

    private String email;

    private String password;

    private Date createTime;

    @OneToMany(mappedBy = "member")
    private List<Letter> letter = new ArrayList<>();

}
