package crappyUnivLife.timeMachineLetter.dto;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class ReceivePostListResponse {
    public ReceivePostListResponse(String email, List<Letter> receiveLetterList) {
        this.email = email;
        this.receiveLetterList = receiveLetterList;
    }

    private String email;
    private List<Letter> receiveLetterList;
}
