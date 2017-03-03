package gov.samhsa.c2s.c2sui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigRestController {
    @Autowired
    private C2SUIProperties c2suiProperties;

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public C2SUIProperties getConfig() {
        return c2suiProperties;
    }
}
