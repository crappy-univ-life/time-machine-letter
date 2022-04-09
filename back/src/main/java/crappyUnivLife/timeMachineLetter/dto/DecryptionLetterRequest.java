package crappyUnivLife.timeMachineLetter.dto;

import lombok.Data;

@Data
public class DecryptionLetterRequest {
    private String hash;
    private String password;
}
