package crappyUnivLife.timeMachineLetter.dto;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.Data;

import java.util.ArrayList;

@Data
public class PostListResponse {
    public PostListResponse(String email, ArrayList<Letter> letterList) {
        this.email = email;
        this.letterList = letterList;
    }

    private String email;
    private ArrayList<Letter> letterList;
}
