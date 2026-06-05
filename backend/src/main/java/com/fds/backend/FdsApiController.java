package com.fds.backend;

// 🚀 새롭게 필요한 도구들입니다!
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FdsApiController {

    @GetMapping("/api/status")
    public String checkStatus() {
        return "✅ FDS 백엔드 서버가 정상 작동 중입니다!";
    }

    @GetMapping("/api/file-logs")
    public String getFileLogs() {
        StringBuilder detectedLogs = new StringBuilder();
        int detectCount = 0;

        Map<String, Integer> transferCount = new HashMap<>();
        Map<String, Integer> transferSum = new HashMap<>();
        Map<String, String> accountNames = new HashMap<>();

        try {
            // 🌟 여기가 핵심입니다! JAR 파일로 압축해도 무조건 파일을 찾아내는 안전한 방식
            ClassPathResource resource = new ClassPathResource("raw_transactions.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), "UTF-8"));
            List<String> lines = reader.lines().collect(Collectors.toList());

            for (String line : lines) {
                String[] data = line.split(",");
                if(data.length == 4) {
                    String account = data[0];
                    String name = data[1];
                    int amount = Integer.parseInt(data[2]);
                    String note = data[3];

                    accountNames.put(account, name);

                    if (amount >= 1000000) {
                        detectedLogs.append("⚠️ [고액 이체] ").append(name).append(" (").append(account)
                                .append(") - ").append(amount).append("원 (").append(note).append(")\n");
                        detectCount++;
                    }

                    transferCount.put(account, transferCount.getOrDefault(account, 0) + 1);
                    transferSum.put(account, transferSum.getOrDefault(account, 0) + amount);
                }
            }

            for (String account : transferCount.keySet()) {
                if (transferCount.get(account) >= 3 && transferSum.get(account) >= 2000000) {
                    String name = accountNames.get(account);
                    detectedLogs.append("🚨 [스머핑 의심] ").append(name).append(" (").append(account)
                            .append(") - 단기간 ").append(transferCount.get(account)).append("회 분할 이체, ")
                            .append("총 누적 ").append(transferSum.get(account)).append("원!\n");
                    detectCount++;
                }
            }

            if (detectCount == 0) {
                return "✅ 현재 의심되는 거래가 없습니다.";
            }

            return "총 " + detectCount + "건의 이상거래 탐지!\n\n" + detectedLogs.toString();

        } catch (Exception e) {
            return "데이터 처리 중 오류 발생: " + e.getMessage();
        }
    }
    // 표에 데이터를 넣기 위해 JSON 형태로 반환하는 새로운 API
    @GetMapping("/api/violation-logs")
    public List<Map<String, Object>> getViolationLogs() {
        List<Map<String, Object>> violations = new ArrayList<>();
        Map<String, Integer> transferCount = new HashMap<>();
        Map<String, Integer> transferSum = new HashMap<>();
        Map<String, String> accountNames = new HashMap<>();

        try {
            ClassPathResource resource = new ClassPathResource("raw_transactions.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), "UTF-8"));
            List<String> lines = reader.lines().collect(Collectors.toList());

            int txId = 1;
            for (String line : lines) {
                String[] data = line.split(",");
                if(data.length == 4) {
                    String account = data[0];
                    String name = data[1];
                    int amount = Integer.parseInt(data[2]);
                    String note = data[3];

                    accountNames.put(account, name);

                    // 고액 이체 데이터를 표 형식에 맞게 조립
                    if (amount >= 1000000) {
                        Map<String, Object> log = new HashMap<>();
                        log.put("id", "TXN-" + String.format("%03d", txId++));
                        log.put("type", "고액 이체");
                        log.put("amount", amount);
                        log.put("recipient", name + " (" + account + ")");
                        log.put("method", note);
                        violations.add(log);
                    }

                    transferCount.put(account, transferCount.getOrDefault(account, 0) + 1);
                    transferSum.put(account, transferSum.getOrDefault(account, 0) + amount);
                }
            }

            // 스머핑 데이터를 표 형식에 맞게 조립
            for (String account : transferCount.keySet()) {
                if (transferCount.get(account) >= 3 && transferSum.get(account) >= 2000000) {
                    Map<String, Object> log = new HashMap<>();
                    log.put("id", "TXN-" + String.format("%03d", txId++));
                    log.put("type", "스머핑 의심");
                    log.put("amount", transferSum.get(account));
                    log.put("recipient", accountNames.get(account) + " (" + account + ")");
                    log.put("method", "단기간 " + transferCount.get(account) + "회 분할 이체");
                    violations.add(log);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return violations; // 스프링 부트가 알아서 JSON으로 변환해 줍니다!
    }

    // 📊 대시보드 통계 및 차트 데이터를 제공하는 API
    @GetMapping("/api/dashboard-stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        int total = 0;

        try {
            // 1. 파일에서 전체 거래 건수(줄 수) 읽어오기
            ClassPathResource resource = new ClassPathResource("raw_transactions.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), "UTF-8"));
            total = reader.lines().collect(Collectors.toList()).size();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 2. 이상 거래 건수는 아까 만든 상세 내역 API의 개수를 그대로 가져옵니다 (똑똑하죠!)
        int blocked = getViolationLogs().size();
        int normal = total - blocked; // 정상 거래 = 전체 - 이상 거래

        // 3. 상단 요약 카드용 데이터 저장
        stats.put("totalTransactions", total);
        stats.put("normalTransactions", normal);
        stats.put("blockedTransactions", blocked);

        // 4. 그래프용 데이터 만들기 (과거 시간은 가상 데이터, '현재'는 진짜 데이터 반영!)
        List<Map<String, Object>> chartData = new ArrayList<>();
        chartData.add(createChartPoint("10:00", 120, 2));
        chartData.add(createChartPoint("11:00", 250, 5));
        chartData.add(createChartPoint("12:00", 180, 1));
        chartData.add(createChartPoint("13:00", 300, 8));
        chartData.add(createChartPoint("14:00 (현재)", normal, blocked)); // 👈 방금 파일에서 읽은 진짜 데이터!

        stats.put("chartData", chartData);
        return stats; // JSON으로 묶어서 리액트로 전송!
    }

    // 차트 데이터 생성을 도와주는 미니 함수 (이것도 같이 복사해주세요)
    private Map<String, Object> createChartPoint(String time, int normal, int blocked) {
        Map<String, Object> point = new HashMap<>();
        point.put("name", time);
        point.put("정상", normal);
        point.put("이상", blocked);
        return point;
    }
}