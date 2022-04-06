package crappyUnivLife.timeMachineLetter.dto;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
public class PostListResponse {
    public PostListResponse(String email, List<Letter> letterList) {
        this.email = email;
        this.letterList = letterList;
    }

    private String email;
    private List<Letter> letterList;
}
