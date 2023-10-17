# node 사용할 이미지 선택
FROM node:18-alpine
# 작업 디렉토리 설정
WORKDIR /app
# 소스 코드 복사
COPY . .
# 종속성 설치
RUN npm install 
# 포트 설정
EXPOSE 4000
# 서버 시작.
CMD ["node", "src/server.js"]