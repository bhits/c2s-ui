package gov.samhsa.c2s.c2sui;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Ignore("Depends on config-server on bootstrap")
public class C2SUIApplicationTests {

	@Test
	public void contextLoads() {
	}

}
