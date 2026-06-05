package com.fds.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FdsApiController {

    // 리액트에서 이 주소로 접속하면 서버 상태를 반환해줍니다.
    @GetMapping("/api/status")
    public String checkStatus() {
        return "✅ FDS 백엔드 서버가 정상적으로 작동 중입니다!";
    }
}