package crappyUnivLife.timeMachineLetter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TimeMachineLetterApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeMachineLetterApplication.class, args);
		System.out.println("Jenkins Ci 테스트 : 빌드 완료");
	}

}
