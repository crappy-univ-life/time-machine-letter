package crappyUnivLife.timeMachineLetter.dto;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import lombok.Data;

import java.util.Date;

@Data
public class LetterReadResponse {
    public LetterReadResponse(Letter letter) {
        this.id = letter.getId();
        this.hash = letter.getHash();
        this.openAt = letter.getOpenAt();
        this.title = letter.getTitle();
        this.content = letter.getContent();
        this.letterFrom = letter.getLetterFrom();
        this.letterTo = letter.getLetterTo();
        this.createAt = letter.getCreateAt();
        this.isEncrypted = letter.getIsEncrypted();
    }
    private Long id;

    private String hash;

    private Boolean readable;

    private Boolean isEncrypted;

    private Date openAt;

    private String title;

    private String content;

    private String letterFrom;

    private String letterTo;

    private Date createAt;
}
