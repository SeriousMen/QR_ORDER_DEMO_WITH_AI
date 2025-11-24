# QR 메뉴 데모

QR 코드로 메뉴를 보고 주문할 수 있는 데모 애플리케이션입니다.

## 기술 스택

- **Frontend**: React 19 + TypeScript + Vite
- **스타일링**: Tailwind CSS
- **상태관리**: Zustand (클라이언트 상태) + React Query (서버 상태)
- **UI 컴포넌트**: Headless UI + Heroicons
- **데이터**: Mock 데이터 (Firestore 대신)
- **다국어**: react-i18next

## 주요 기능

- 📱 반응형 디자인
- 🍽️ 메뉴 카테고리별 필터링 (전체/음식/음료)
- 🛒 장바구니 기능
- ➕ 수량 조절
- 💰 총 금액 계산
- 📦 주문 완료

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── layouts/       # 레이아웃 컴포넌트
├── hooks/         # 커스텀 훅
├── stores/        # Zustand 스토어
├── data/          # Mock 데이터
└── utils/         # 유틸리티 함수
```

## 데모 데이터

현재 8개의 메뉴 아이템이 포함되어 있습니다:
- 음식 4개 (불고기 정식, 김치찌개, 비빔밥, 삼겹살 구이)
- 음료 4개 (아메리카노, 카페라떼, 오렌지 주스, 콜라)

실제 프로덕션에서는 Firebase Firestore나 다른 데이터베이스로 교체할 수 있습니다.