package crappyUnivLife.timeMachineLetter.dto;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;

@Data
@ToString
public class PostListResponse {
    public PostListResponse(String email, ArrayList<Letter> letterList) {
        this.email = email;
        this.letterList = letterList;
    }

    private String email;
    private ArrayList<Letter> letterList;
}
