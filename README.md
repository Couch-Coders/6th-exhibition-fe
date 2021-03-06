# 6th-exhibition-fe
6기 전시 프로젝트 프론트엔드

22.01.27 dev, build/setting branch 생성

# 추가 구현 필요 기능

사용자 UX 개선에 도움이 될 세부적인 내용들

## exhibition

1. 전시 상세 내용 조회 시 리뷰 delete 전 확인 메시지 표시
2. 로그인 하지 않은 유저가 좋아요 기능 사용 시도할 때 안내 메시지 출력
3. 전시 상세 보기에서 다른 전시 정보로 옮겨갈 수 있는 기능

## myLists

목록 무한 스크롤, 공용 컴포넌트 사용

## 개선하고 싶은 점

- 에러 발생 시 표시하는 메시지 추가, 예외 처리, 에러 페이지
- routes에 Auth 적용
- 회원 인식에 대한 싱크 안 맞는 부분
- loading 중일 때 대기 표시 애니메이션 추가
- pagenation(데이터 수가 적어서 우선 순위가 낮았음)
- 낮은 코드 일관성, 낮은 모듈화(중복 코드 발생)
- 비동기 싱크 안 맞음(memory leak 관련 오류 포함)
- antd 의존성에 의해 발생하는 오류
- 자연스러운 애니메이션 및 상태 변화에 따른 디자인 변경
- 전체적으로 너무 느림. 성능 개선
